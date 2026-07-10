import { createHash } from "node:crypto"
import { HashingError } from "./errors"
import { normalizeText } from "./utils"

export function sha256(content: string): string {
  try {
    return createHash("sha256").update(normalizeText(content), "utf8").digest("hex")
  } catch (error) {
    throw new HashingError("Unable to generate SHA-256 hash", error)
  }
}

export function stableDocumentId(sha: string): string {
  if (!/^[a-f0-9]{64}$/i.test(sha)) throw new HashingError("A valid SHA-256 digest is required")
  return `doc_${sha.slice(0, 32).toLowerCase()}`
}
