import type { CompressionAlgorithm, SupportedMimeType } from "./types"

export const SUPPORTED_MIME_TYPES: readonly SupportedMimeType[] = [
  "text/html",
  "application/xhtml+xml",
  "text/plain",
  "application/pdf",
]

export const SUPPORTED_ENCODINGS = new Set(["utf-8", "utf8", "us-ascii", "ascii"])
export const DEFAULT_MIME_TYPE: SupportedMimeType = "text/html"
export const DEFAULT_ENCODING = "utf-8"
export const DEFAULT_MAX_DOCUMENT_SIZE = 10 * 1024 * 1024
export const DEFAULT_COMPRESSION: CompressionAlgorithm = "brotli"
export const DEFAULT_NEAR_DUPLICATE_THRESHOLD = 0.86
export const FINGERPRINT_BITS = 64
export const FINGERPRINT_HEX_LENGTH = FINGERPRINT_BITS / 4
export const SHINGLE_SIZE = 3
export const BINARY_CONTROL_THRESHOLD = 0.03
export const CORRUPTION_MARKERS = ["\u0000", "\ufffd\ufffd\ufffd"] as const
