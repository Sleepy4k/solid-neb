"use server";

import { redirect } from "@solidjs/router";
import SebService from "@server/db/seb.service.js";
import SebFile from "@lib/server/seb.js";
import { decryptAuthVerify } from "@lib/server/encryption.js";
import { parseXMLString } from "@lib/server/parse.js";

const WEB_HEADER = "WhatIsThisEvenDoingHereJustGoAway";

export const uploadSebAction = async (formData: FormData) => {
  const file = formData.get("file") as File;
  const fileName = formData.get("file_name") as string;
  const webToken = formData.get("web_token") as string;

  if (!file || file.size === 0) {
    return { error: "File not found or invalid file type" };
  }
  if (!fileName || !fileName.trim()) {
    return { error: "Config name is required" };
  }

  // Decrypt and verify the web token
  if (!webToken || decryptAuthVerify(webToken) !== WEB_HEADER) {
    return { error: "Unauthorized request" };
  }

  try {
    const data = await file.text();
    const parsedData = parseXMLString(data);

    if (!parsedData) {
      return { error: "Failed to parse the uploaded SEB file" };
    }

    const uniqueHash = SebService.generateFileHash(parsedData, file.size);
    const resultFilePath = SebService.getResultFilePath(uniqueHash);

    const cachedFile = await SebService.getCachedSebFile(resultFilePath);
    if (cachedFile) {
      return redirect(`/services/seb?id=${uniqueHash}&file_name=${encodeURIComponent(fileName)}`);
    }

    const sebFile = SebFile.createInstance(parsedData);
    if (!sebFile?.StartUrl?.trim()) {
      return { error: "The SEB file does not contain a valid StartUrl" };
    }

    await SebService.cacheResult(resultFilePath, sebFile);

    return redirect(`/services/seb?id=${uniqueHash}&file_name=${encodeURIComponent(fileName)}`);
  } catch (error: any) {
    console.error("Error processing SEB file:", error);
    return { error: `An error occurred while processing the SEB file: ${error.message}` };
  }
};
