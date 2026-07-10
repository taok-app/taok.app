import { BINARY_CONTROL_THRESHOLD, CORRUPTION_MARKERS, DEFAULT_ENCODING, DEFAULT_MAX_DOCUMENT_SIZE, SUPPORTED_ENCODINGS } from "./constants"
import { ValidationError } from "./errors"
import { detectMimeType, isTextMimeType } from "./mime"
import type { ExtractedDocument } from "../extraction/types"
import type { ValidatedDocument, ValidationOptions } from "./types"
import { utf8Size } from "./utils"

export function isLikelyBinary(content: string): boolean {
  if (content.includes("\u0000")) return true
  if (content.length === 0) return false
  let controls = 0
  for (const character of content) {
    const code = character.charCodeAt(0)
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) controls += 1
  }
  return controls / content.length > BINARY_CONTROL_THRESHOLD
}

export function validateDocument(document: ExtractedDocument, options: ValidationOptions = {}): Readonly<ValidatedDocument> {
  if (!document || typeof document !== "object") throw new ValidationError("Document is required")
  const payload = document.html || document.text || document.markdown
  if (!payload?.trim()) throw new ValidationError("Document content is empty")

  const mimeType = detectMimeType(payload, options.mimeType)
  const encoding = (options.encoding || DEFAULT_ENCODING).trim().toLowerCase()
  if (!SUPPORTED_ENCODINGS.has(encoding)) throw new ValidationError(`Invalid or unsupported encoding: ${encoding}`)
  if (isTextMimeType(mimeType) && isLikelyBinary(payload)) throw new ValidationError("Binary content is not supported")
  if (CORRUPTION_MARKERS.some((marker) => payload.includes(marker))) throw new ValidationError("Document content appears corrupted")

  const originalSize = utf8Size(payload)
  const maximumSize = options.maxDocumentSize ?? DEFAULT_MAX_DOCUMENT_SIZE
  if (!Number.isSafeInteger(maximumSize) || maximumSize <= 0) throw new ValidationError("Maximum document size must be a positive safe integer")
  if (originalSize > maximumSize) throw new ValidationError(`Document exceeds maximum size of ${maximumSize} bytes`)

  return Object.freeze({ document, mimeType, encoding, originalSize })
}
