import type { ProcessingStatistics } from "./types"

export const EMPTY_PROCESSING_STATISTICS: Readonly<ProcessingStatistics> = Object.freeze({
  documentsProcessed: 0,
  duplicatesDetected: 0,
  compressionSavings: 0,
  totalOriginalSize: 0,
  totalCompressedSize: 0,
  averageDocumentSize: 0,
  processingDurationMs: 0,
  validationFailures: 0,
})

export interface ProcessingMetricEvent {
  originalSize?: number
  compressedSize?: number
  durationMs?: number
  duplicate?: boolean
  validationFailure?: boolean
}

export function recordProcessingMetric(
  statistics: Readonly<ProcessingStatistics>,
  event: Readonly<ProcessingMetricEvent>,
): Readonly<ProcessingStatistics> {
  const processed = event.validationFailure ? statistics.documentsProcessed : statistics.documentsProcessed + 1
  const originalSize = statistics.totalOriginalSize + (event.originalSize ?? 0)
  const compressedSize = statistics.totalCompressedSize + (event.compressedSize ?? 0)
  return Object.freeze({
    documentsProcessed: processed,
    duplicatesDetected: statistics.duplicatesDetected + (event.duplicate ? 1 : 0),
    compressionSavings: Math.max(0, originalSize - compressedSize),
    totalOriginalSize: originalSize,
    totalCompressedSize: compressedSize,
    averageDocumentSize: processed === 0 ? 0 : originalSize / processed,
    processingDurationMs: statistics.processingDurationMs + (event.durationMs ?? 0),
    validationFailures: statistics.validationFailures + (event.validationFailure ? 1 : 0),
  })
}
