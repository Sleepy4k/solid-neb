import { Node } from "@lib/server/dom.js";
import { DOMParser } from "@xmldom/xmldom";

export type XMLValue = string | number | boolean | XMLValue[] | XMLDictionary | Uint8Array | Date | undefined;

export interface XMLDictionary {
  [key: string]: XMLValue;
}

const processXMLValue = (node: Node): XMLValue => {
  switch (node.nodeName) {
    case "array":
      return handleXMLValArray(node);
    case "data":
    case "string":
      return node.textContent?.trim() ?? "";
    case "dict":
      return handleXMLValDict(node);
    case "false":
      return false;
    case "integer":
      return parseInt(node.textContent ?? "0", 10);
    case "real":
      return parseFloat(node.textContent ?? "0");
    case "true":
      return true;
    default:
      return undefined;
  }
};

const handleXMLValArray = (node: Node): XMLValue[] => {
  return Array.from(node.childNodes)
    .filter((childNode) => childNode.nodeType === Node.ELEMENT_NODE)
    .map((childNode) => processXMLValue(childNode))
    .filter((value) => value !== undefined) as XMLValue[];
};

const handleXMLValDict = (node: Node): XMLDictionary => {
  const nestedDict: XMLDictionary = {};
  let nestedKey: null | string = null;

  Array.from(node.childNodes).forEach((childNode) => {
    if (childNode.nodeType !== Node.ELEMENT_NODE) return;

    if (childNode.nodeName === "key") {
      nestedKey = childNode.textContent ?? null;
      return;
    }

    if (!nestedKey) return;

    const value = processXMLValue(childNode);
    if (value !== undefined) nestedDict[nestedKey] = value;

    nestedKey = null;
  });

  return nestedDict;
};

export const parseXMLString = (htmlString: string): undefined | XMLDictionary => {
  let currentKey: null | string = null;

  function handleNode(node: Node, dict: XMLDictionary): void {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    if (node.nodeName === "key") {
      currentKey = node.textContent ?? null;
      return;
    }

    if (!currentKey) {
      Array.from(node.childNodes).forEach((childNode) => {
        handleNode(childNode, dict);
      });
      return;
    }

    const value = processXMLValue(node);
    if (value !== undefined) dict[currentKey] = value;

    currentKey = null;
  }

  const parser = new DOMParser();

  try {
    const dictionary: XMLDictionary = {};
    const doc = parser.parseFromString(htmlString, "text/xml");

    const dicts = doc.getElementsByTagName("dict");
    if (dicts.length > 0) {
      const dict = dicts[0];
      Array.from(dict.childNodes).forEach((currentNode) => {
        handleNode(currentNode as unknown as Node, dictionary);
      });
    }

    return dictionary;
  } catch (e) {
    console.error("Error parsing XML:", e);
    return;
  }
};

export const serialize = (dictionary: XMLDictionary): string => {
  function _serialize(value: XMLValue): string {
    if (Array.isArray(value)) {
      return _serializeList(value);
    } else if (value instanceof Uint8Array) {
      return `"${btoa(String.fromCharCode(...new Uint8Array(value)))}"`;
    } else if (value instanceof Date) {
      return `"${value.toISOString()}"`;
    } else if (value && typeof value === "object") {
      return serialize(value as XMLDictionary);
    } else if (typeof value === "boolean" || typeof value === "number") {
      return value.toString();
    } else if (typeof value === "string") {
      return `"${value}"`;
    } else {
      return '""';
    }
  }

  function _serializeList(list: XMLValue[]): string {
    return "[" + list.map(_serialize).join(",") + "]";
  }

  function serialize(obj: XMLDictionary): string {
    const result = Object.keys(obj)
      .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
      .filter((key) => {
        const value = obj[key];
        const isOriginator = key.toLowerCase() === "originatorversion";
        const isObject = value && typeof value === "object" && !Array.isArray(value);
        const isEmpty = value && Object.keys(value).length === 0;

        return !isOriginator && (!isObject || !isEmpty);
      })
      .map((key) => `"${key}":${_serialize(obj[key])}`)
      .join(",");

    return `{${result}}`;
  }

  return serialize(dictionary);
};
