import SebFile from "@lib/server/seb.js";
import UserAgentGenerator from "@lib/server/userAgent.js";
import { base64, sha256 } from "@lib/server/encryption.js";
import fs from "node:fs/promises";
import path from "node:path";

const userAgentGenerator = new UserAgentGenerator();

const serviceConfig = {
  response: {
    showConfigHash: true,
    showDictionnary: false,
    showRequestHash: true,
    showSerializedJson: false,
    showStartUrl: true,
    showUserAgent: true,
  },
};

const SebService = {
  buildResponseFields(sebFile: SebFile, fileName: string): { name: string; value: string | undefined }[] {
    return [
      ...(serviceConfig.response.showStartUrl ? [{ name: "Referer", value: sebFile.StartUrl }] : []),
      ...(serviceConfig.response.showUserAgent
        ? [{ name: "User-Agent", value: userAgentGenerator.generate() ?? "default-user-agent" }]
        : []),
      ...(serviceConfig.response.showRequestHash ? [{ name: "X-SafeExamBrowser-RequestHash", value: sebFile.RequestHash }] : []),
      ...(serviceConfig.response.showConfigHash ? [{ name: "X-SafeExamBrowser-ConfigKeyHash", value: sha256((sebFile.StartUrl ?? "") + sebFile.ConfigHash) }] : []),
      { name: "File-Name", value: fileName || "Naka Exam Bypasser" },
      ...(serviceConfig.response.showSerializedJson ? [{ name: "Serialized", value: sebFile.SerializedJson }] : []),
      ...(serviceConfig.response.showDictionnary ? [{ name: "Dictionary", value: JSON.stringify(sebFile.Dictionnary) }] : []),
    ];
  },

  async cacheResult(resultFilePath: string, sebFile: SebFile): Promise<void> {
    const dir = path.dirname(resultFilePath);
    if (!(await fs.stat(dir).catch(() => false))) {
      await fs.mkdir(dir, { recursive: true });
    }
    await fs.writeFile(resultFilePath, JSON.stringify(sebFile, null, 2), { encoding: "utf8" });
  },

  generateFileHash(parsedData: Record<string, any>, fileSize: number): string {
    const sendBrowserExamKey = parsedData.sendBrowserExamKey ? "1" : "0";
    const startURL = typeof parsedData.startURL === "string" ? parsedData.startURL : "no-start-url";
    return base64(`${fileSize.toString()}-${sendBrowserExamKey}-${Object.keys(parsedData).length.toString()}-${startURL}`);
  },

  async getCachedSebFile(resultFilePath: string): Promise<any | null> {
    try {
      const data = await fs.readFile(resultFilePath, { encoding: "utf8" });
      const sebFile = JSON.parse(data) as SebFile;
      return sebFile;
    } catch {
      return null;
    }
  },

  getResultFilePath(hash: string): string {
    const basedir = path.resolve("./storage/app/seb/results");
    return path.join(basedir, `${hash}.json`);
  },
};

export default SebService;
