import { type XMLDictionary } from "@lib/server/parse.js";
import { sha256 } from "@lib/server/encryption.js";
import { serialize } from "@lib/server/parse.js";

class SebFile {
  public readonly ConfigHash: string;
  public readonly Dictionnary: XMLDictionary;
  public readonly RequestHash: string;
  public readonly SerializedJson: string;
  public readonly StartUrl: string | undefined;

  private constructor(dictionnary: XMLDictionary, serializedJson: string, startUrl: string | undefined, configKey: string, requestKey: string) {
    this.Dictionnary = dictionnary;
    this.SerializedJson = serializedJson;
    this.StartUrl = startUrl;
    this.ConfigHash = configKey;
    this.RequestHash = requestKey;
  }

  public static createInstance(dictionnary: undefined | XMLDictionary): SebFile | undefined {
    if (!dictionnary) return;

    const serializedJson = serialize(dictionnary);
    const startUrl = this.getStartUrl(dictionnary);
    const configHash = this.getConfigHash(serializedJson);
    const requestHash = this.getRequestHash(dictionnary);

    return new SebFile(dictionnary, serializedJson, startUrl, configHash, requestHash);
  }

  private static getConfigHash(serializedJson: string): string {
    return sha256(serializedJson);
  }

  private static getRequestHash(dictionnary: XMLDictionary): string {
    const keySalt = dictionnary.examKeySalt;
    const key = keySalt && typeof keySalt === "string" ? new Uint32Array(keySalt.split(",").map(Number)) : new Uint32Array();

    return sha256(key.toString());
  }

  private static getStartUrl(dictionnary: XMLDictionary): string | undefined {
    const startUrl = dictionnary.startURL;
    if (typeof startUrl !== "string") return undefined;

    return startUrl;
  }

  public getConfigKey(url: string): string {
    return sha256(url + this.ConfigHash);
  }
}

export default SebFile;
