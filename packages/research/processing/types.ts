import type { ExtractedDocument } from "../extraction/types"

export type SupportedMimeType = "text/html" | "application/xhtml+xml" | "text/plain" | "application/pdf"
export type CompressionAlgorithm = "gzip" | "brotli"
export type DuplicateKind = "exact" | "hash" | "canonical" | "fingerprint" | "near-content"

export interface ProcessedDocument {
  id: string
  url: string
  canonicalUrl: string
  title: string
  markdown: string
  text: string
  html: string
  sha256: string
  fingerprint: string
  mimeType: string
  encoding: string
  language: string
  wordCount: number
  characterCount: number
  estimatedTokens: number
  readingTime: number
  compressedSize: number
  originalSize: number
  duplicateOf?: string
  isDuplicate: boolean
  metadata: Record<string, unknown>
  createdAt: Date
}

export interface DuplicateCandidate {
  id: string
  canonicalUrl: string
  sha256: string
  fingerprint: string
  text?: string
}

export interface DuplicateResult {
  isDuplicate: boolean
  duplicateOf?: string
  kind?: DuplicateKind
  confidence: number
}

export interface CompressionResult {
  algorithm: CompressionAlgorithm
  data: Uint8Array
  originalSize: number
  compressedSize: number
  ratio: number
}

export interface RobotsDirectives {
  noindex: boolean
  nofollow: boolean
  noarchive: boolean
  unavailableAfter?: Date
  raw: readonly string[]
}

export interface ProcessingOptions {
  mimeType?: string
  encoding?: string
  maxDocumentSize?: number
  compression?: CompressionAlgorithm
  duplicateCandidates?: readonly DuplicateCandidate[]
  nearDuplicateThreshold?: number
  createdAt?: Date
}

export interface ProcessingResult {
  document: Readonly<ProcessedDocument>
  compressed: Readonly<CompressionResult>
  duplicate: Readonly<DuplicateResult>
  durationMs: number
}

export interface ValidationOptions {
  mimeType?: string
  encoding?: string
  maxDocumentSize?: number
}

export interface ValidatedDocument {
  document: ExtractedDocument
  mimeType: SupportedMimeType
  encoding: string
  originalSize: number
}

export interface ProcessingStatistics {
  documentsProcessed: number
  duplicatesDetected: number
  compressionSavings: number
  totalOriginalSize: number
  totalCompressedSize: number
  averageDocumentSize: number
  processingDurationMs: number
  validationFailures: number
}

export interface StorageObject {
  key: string
  data: Uint8Array
  contentType: string
  encoding?: string
  metadata?: Readonly<Record<string, string>>
}

export interface StoredObject {
  key: string
  size: number
  etag?: string
  metadata?: Readonly<Record<string, string>>
}

export interface DocumentWriter {
  write(object: Readonly<StorageObject>): Promise<Readonly<StoredObject>>
}

export interface DocumentReader {
  read(key: string): Promise<Readonly<StorageObject> | null>
  exists(key: string): Promise<boolean>
}

export interface DocumentStorage extends DocumentWriter, DocumentReader {
  delete(key: string): Promise<void>
}
