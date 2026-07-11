import { resolveCanonicalUrl } from "./canonical"
import { ExtractionError, ValidationError } from "./errors"
import { parseHtml } from "./html"
import { detectLanguage } from "./language"
import { convertToMarkdown } from "./markdown"
import { extractMetadata } from "./metadata"
import { extractReadableContent } from "./readability"
import { sanitizeDocument } from "./sanitize"
import { calculateStatistics } from "./statistics"
import type { ExtractedDocument, ExtractionInput } from "./types"
import { createDocumentId, normalizeInlineText } from "./utils"

function validateInput(input: ExtractionInput): URL {
  if (!input || typeof input.html !== "string" || typeof input.url !== "string") {
    throw new ValidationError("Extraction input requires string url and html fields")
  }
  let url: URL
  try {
    url = new URL(input.url)
  } catch (cause) {
    throw new ValidationError("Extraction URL must be absolute", { cause })
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new ValidationError("Extraction URL must use HTTP or HTTPS")
  }
  return url
}

/** Transforms fetched HTML into a deterministic, normalized research document. */
export function extractDocument(input: ExtractionInput): ExtractedDocument {
  try {
    const sourceUrl = validateInput(input).toString()
    const parsed = parseHtml(input.html, sourceUrl)
    const sanitized = sanitizeDocument(parsed)
    const readable = extractReadableContent(sanitized)
    const markdown = convertToMarkdown(readable.html)
    const metadata = extractMetadata(sanitized)
    const canonicalUrl = resolveCanonicalUrl(sourceUrl, metadata.canonical)
    const language = detectLanguage(readable.text, metadata.language)
    const statistics = calculateStatistics(readable.text, readable.html)
    const title = normalizeInlineText(metadata.title || readable.title || "Untitled") || "Untitled"

    return {
      id: createDocumentId(canonicalUrl, readable.text),
      url: sourceUrl,
      canonicalUrl,
      title,
      ...(metadata.description ?? readable.excerpt ? { description: metadata.description ?? readable.excerpt } : {}),
      html: readable.html,
      markdown,
      text: readable.text,
      ...(metadata.author ?? readable.byline ? { author: metadata.author ?? readable.byline } : {}),
      ...(metadata.siteName ? { siteName: metadata.siteName } : {}),
      ...(language ? { language } : {}),
      ...(metadata.publishedAt ? { publishedAt: metadata.publishedAt } : {}),
      ...statistics,
      metadata: {
        ...metadata.raw,
        openGraph: metadata.openGraph,
        twitter: metadata.twitter,
        ...(metadata.keywords ? { keywords: metadata.keywords } : {}),
        ...(metadata.robots ? { robots: metadata.robots } : {}),
      },
    }
  } catch (cause) {
    if (cause instanceof ExtractionError) throw cause
    throw new ExtractionError("Document extraction failed", "pipeline", { cause })
  }
}
