import type { ExtractedDocument } from "../extraction/types"
import { DEFAULT_COMPRESSION, DEFAULT_ENCODING, DEFAULT_MIME_TYPE } from "./constants"
import { compressContent } from "./compression"
import { detectDuplicate } from "./deduplication"
import { ProcessingError } from "./errors"
import { createFingerprint } from "./fingerprint"
import { sha256, stableDocumentId } from "./hashing"
import { parseRobots } from "./robots"
import type { ProcessedDocument, ProcessingOptions, ProcessingResult } from "./types"
import { contentForIdentity, freezeRecord, normalizeDocument } from "./utils"
import { validateDocument } from "./validation"

export function processDocument(document: ExtractedDocument, options: ProcessingOptions = {}): Readonly<ProcessingResult> {
  const startedAt = performance.now()
  try {
    const validated = validateDocument(document, {
      mimeType: options.mimeType ?? DEFAULT_MIME_TYPE,
      encoding: options.encoding ?? DEFAULT_ENCODING,
      maxDocumentSize: options.maxDocumentSize,
    })
    const normalized = normalizeDocument(validated.document)
    const identityContent = contentForIdentity(normalized)
    const contentHash = sha256(identityContent)
    const fingerprint = createFingerprint(identityContent)
    const duplicate = detectDuplicate(
      { canonicalUrl: normalized.canonicalUrl, sha256: contentHash, fingerprint, text: normalized.text },
      options.duplicateCandidates,
      options.nearDuplicateThreshold,
    )
    const compressed = compressContent(normalized.html || normalized.text, options.compression ?? DEFAULT_COMPRESSION)
    const robots = parseRobots(normalized.metadata)
    const createdAt = options.createdAt ? new Date(options.createdAt) : new Date()
    const metadata = freezeRecord({
      ...normalized.metadata,
      robots,
      compression: Object.freeze({ algorithm: compressed.algorithm, ratio: compressed.ratio }),
      duplicate: Object.freeze({ kind: duplicate.kind, confidence: duplicate.confidence }),
    })
    const processed: ProcessedDocument = {
      id: stableDocumentId(contentHash),
      url: normalized.url,
      canonicalUrl: normalized.canonicalUrl,
      title: normalized.title,
      markdown: normalized.markdown,
      text: normalized.text,
      html: normalized.html,
      sha256: contentHash,
      fingerprint,
      mimeType: validated.mimeType,
      encoding: validated.encoding,
      language: normalized.language ?? "und",
      wordCount: normalized.wordCount,
      characterCount: normalized.characterCount,
      estimatedTokens: normalized.estimatedTokens,
      readingTime: normalized.readingTime,
      compressedSize: compressed.compressedSize,
      originalSize: compressed.originalSize,
      ...(duplicate.duplicateOf ? { duplicateOf: duplicate.duplicateOf } : {}),
      isDuplicate: duplicate.isDuplicate,
      metadata,
      createdAt,
    }
    return Object.freeze({
      document: Object.freeze(processed),
      compressed,
      duplicate,
      durationMs: Math.max(0, performance.now() - startedAt),
    })
  } catch (error) {
    if (error instanceof ProcessingError) throw error
    throw new ProcessingError("Document processing failed", "PROCESSING_ERROR", error)
  }
}
