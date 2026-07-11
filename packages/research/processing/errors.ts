export class ProcessingError extends Error {
  readonly code: string
  readonly cause?: unknown

  constructor(message: string, code = "PROCESSING_ERROR", cause?: unknown) {
    super(message)
    this.name = new.target.name
    this.code = code
    this.cause = cause
  }
}

export class ValidationError extends ProcessingError {
  constructor(message: string, cause?: unknown) {
    super(message, "VALIDATION_ERROR", cause)
  }
}

export class DuplicateDetectionError extends ProcessingError {
  constructor(message: string, cause?: unknown) {
    super(message, "DUPLICATE_DETECTION_ERROR", cause)
  }
}

export class HashingError extends ProcessingError {
  constructor(message: string, cause?: unknown) {
    super(message, "HASHING_ERROR", cause)
  }
}

export class CompressionError extends ProcessingError {
  constructor(message: string, cause?: unknown) {
    super(message, "COMPRESSION_ERROR", cause)
  }
}

export class StorageError extends ProcessingError {
  constructor(message: string, cause?: unknown) {
    super(message, "STORAGE_ERROR", cause)
  }
}

export class MimeError extends ProcessingError {
  constructor(message: string, cause?: unknown) {
    super(message, "MIME_ERROR", cause)
  }
}
