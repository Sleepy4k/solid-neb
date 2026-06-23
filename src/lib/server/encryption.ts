import { Hex, SHA256 } from "crypto-es";

const SALT = process.env.AUTH_SALT_KEY ?? "default-salt-key";

export const sha256 = (data: string): string => {
  return SHA256(data).toString(Hex);
};

export const base64 = (data: string): string => {
  return btoa(data);
};

const generateEncryptionKey = (salt: string): string => {
  let key = salt;
  while (key.length < 32) {
    key += salt;
  }
  return key.substring(0, 32);
};

export const encryptAuthVerify = (data: string): string => {
  if (!data) return "";

  const key = generateEncryptionKey(SALT);

  let ciphertext = "";
  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i);
    const keyCharCode = key.charCodeAt(i % key.length);
    const encryptedCharCode = (charCode ^ keyCharCode) + (i % 15);
    ciphertext += String.fromCharCode(encryptedCharCode);
  }

  const keyHash = btoa(Array.from(new TextEncoder().encode(key)).reduce((acc, byte) => acc + byte, ""));
  return btoa(SALT + ":" + keyHash.substring(0, 12) + ":" + ciphertext);
};

export const decryptAuthVerify = (ciphertext: string): string => {
  if (!ciphertext) return "";

  try {
    const decodedCiphertext = atob(ciphertext);
    const parts = decodedCiphertext.split(":");
    if (parts.length !== 3) return "Decryption Error: Invalid ciphertext format.";

    const receivedSalt = parts[0];
    const receivedKeyHash = parts[1];
    const encryptedData = parts[2];

    if (receivedSalt !== SALT) return "Decryption Error: Incorrect salt - potential tampering.";

    const expectedKey = generateEncryptionKey(SALT);
    const expectedKeyHash = btoa(Array.from(new TextEncoder().encode(expectedKey)).reduce((acc, byte) => acc + byte, "")).substring(0, 12);
    if (receivedKeyHash !== expectedKeyHash) return "Decryption Error: Integrity check failed (key mismatch).";

    let plaintext = "";
    for (let i = 0; i < encryptedData.length; i++) {
      const encryptedCharCode = encryptedData.charCodeAt(i);
      const keyCharCode = expectedKey.charCodeAt(i % expectedKey.length);
      const decryptedCharCode = (encryptedCharCode - (i % 15)) ^ keyCharCode;
      plaintext += String.fromCharCode(decryptedCharCode);
    }

    return plaintext;
  } catch {
    return "Decryption Error: Could not decode ciphertext.";
  }
};
