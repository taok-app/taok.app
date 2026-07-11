import { createHash } from "node:crypto"

/** Normalizes Unicode and horizontal/vertical whitespace without losing paragraphs. */
export function normalizeText(value: string): string {
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(/[\t\f\v\u00a0 ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

/** Collapses all whitespace for short metadata values. */
export function normalizeInlineText(value: string): string {
  return normalizeText(value).replace(/\s+/g, " ").trim()
}

/** Returns a stable content identifier for the same canonical URL and content. */
export function createDocumentId(canonicalUrl: string, text: string): string {
  return createHash("sha256").update(canonicalUrl).update("\0").update(text).digest("hex")
}

export function optionalText(value: string | null | undefined): string | undefined {
  const normalized = value ? normalizeInlineText(value) : ""
  return normalized || undefined
}

export function isMeaningfulFragment(fragment: string): boolean {
  return Boolean(fragment && !/^#?(?:top|_?ga|:~:text=)/i.test(fragment))
}
