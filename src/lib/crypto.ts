import { sha256 } from "@noble/hashes/sha256";

export function hash(str: string): string {
  const hash = sha256(str);

  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export function randomUUID() {
  return window.crypto.randomUUID();
}
