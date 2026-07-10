export type ExtractionStage =
  | "validation"
  | "parsing"
  | "sanitization"
  | "readability"
  | "markdown"
  | "metadata"
  | "canonical"
  | "language"
  | "statistics"
  | "pipeline"

export class ExtractionError extends Error {
  constructor(message: string, public readonly stage: ExtractionStage = "pipeline", options?: ErrorOptions) {
    super(message, options)
    this.name = "ExtractionError"
  }
}

export class ReadabilityError extends ExtractionError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, "readability", options)
    this.name = "ReadabilityError"
  }
}

export class MarkdownError extends ExtractionError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, "markdown", options)
    this.name = "MarkdownError"
  }
}

export class MetadataError extends ExtractionError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, "metadata", options)
    this.name = "MetadataError"
  }
}

export class ValidationError extends ExtractionError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, "validation", options)
    this.name = "ValidationError"
  }
}
