import { type DOMWindow, JSDOM } from "jsdom";

/**
 * Node class from JSDOM to get the window object.
 */
const Node: DOMWindow["Node"] = new JSDOM().window.Node;

export { Node };
