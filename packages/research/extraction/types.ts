export interface ExtractedDocument {
  id: string
  url: string
  canonicalUrl: string
  title: string
  description?: string
  html: string
  markdown: string
  text: string
  author?: string
  siteName?: string
  language?: string
  publishedAt?: Date
  wordCount: number
  characterCount: number
  headingCount: number
  imageCount: number
  linkCount: number
  estimatedTokens: number
  readingTime: number
  metadata: Record<string, unknown>
}

export interface ExtractionInput {
  url: string
  html: string
}

export interface ReadabilityResult {
  title: string
  byline?: string
  excerpt?: string
  html: string
  text: string
}

export interface ExtractedMetadata {
  title?: string
  description?: string
  author?: string
  keywords?: string[]
  robots?: string
  canonical?: string
  publishedAt?: Date
  language?: string
  siteName?: string
  openGraph: Record<string, string>
  twitter: Record<string, string>
  raw: Record<string, string | string[]>
}

export interface DocumentStatistics {
  wordCount: number
  characterCount: number
  headingCount: number
  imageCount: number
  linkCount: number
  estimatedTokens: number
  readingTime: number
}
