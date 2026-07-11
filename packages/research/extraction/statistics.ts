import { JSDOM } from "jsdom"
import { DEFAULT_READING_WORDS_PER_MINUTE, ESTIMATED_CHARACTERS_PER_TOKEN } from "./constants"
import type { DocumentStatistics } from "./types"
import { normalizeText } from "./utils"

/** Calculates normalized content and semantic-element statistics. */
export function calculateStatistics(text: string, html: string): DocumentStatistics {
  const normalized = normalizeText(text)
  const wordCount = normalized ? normalized.split(/\s+/u).filter(Boolean).length : 0
  const characterCount = [...normalized].length
  const document = new JSDOM(`<body>${html}</body>`).window.document
  return {
    wordCount,
    characterCount,
    headingCount: document.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
    imageCount: document.querySelectorAll("img").length,
    linkCount: document.querySelectorAll("a[href]").length,
    estimatedTokens: Math.ceil(characterCount / ESTIMATED_CHARACTERS_PER_TOKEN),
    readingTime: wordCount === 0 ? 0 : Math.max(1, Math.ceil(wordCount / DEFAULT_READING_WORDS_PER_MINUTE)),
  }
}
