import { Readability } from "@mozilla/readability"
import { MINIMUM_READABILITY_TEXT_LENGTH } from "./constants"
import type { ReadabilityResult } from "./types"
import { normalizeInlineText, normalizeText, optionalText } from "./utils"

function bodyFallback(document: Document): ReadabilityResult {
  const body = document.body?.cloneNode(true) as HTMLElement | undefined
  const html = body?.innerHTML.trim() ?? ""
  const text = normalizeText(body?.textContent ?? "")
  return {
    title: normalizeInlineText(document.title || document.querySelector("h1")?.textContent || "Untitled"),
    html,
    text,
  }
}

/** Extracts primary article content, falling back to the sanitized body. */
export function extractReadableContent(document: Document): ReadabilityResult {
  try {
    const article = new Readability(document.cloneNode(true) as Document).parse()
    const text = normalizeText(article?.textContent ?? "")
    if (!article?.content || text.length < MINIMUM_READABILITY_TEXT_LENGTH) return bodyFallback(document)

    return {
      title: normalizeInlineText(article.title || document.title || "Untitled"),
      byline: optionalText(article.byline),
      excerpt: optionalText(article.excerpt),
      html: article.content.trim(),
      text,
    }
  } catch {
    return bodyFallback(document)
  }
}
