import type { ExtractedDocument } from "../extraction/types"

export function normalizeText(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .replace(/[\t\f\v ]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

export function normalizeHtml(value: string): string {
  return normalizeText(value).replace(/>\s+</g, "><")
}

export function normalizeDocument(document: ExtractedDocument): ExtractedDocument {
  return Object.freeze({
    ...document,
    title: normalizeText(document.title),
    html: normalizeHtml(document.html),
    markdown: normalizeText(document.markdown),
    text: normalizeText(document.text),
    metadata: Object.freeze({ ...document.metadata }),
  })
}

export function contentForIdentity(document: Pick<ExtractedDocument, "title" | "text" | "markdown">): string {
  return normalizeText(`${document.title}\n${document.text || document.markdown}`)
}

export function clamp(value: number, minimum = 0, maximum = 1): number {
  return Math.min(maximum, Math.max(minimum, value))
}

export function utf8Size(value: string): number {
  return Buffer.byteLength(value, "utf8")
}

export function canonicalKey(value: string): string {
  try {
    const url = new URL(value)
    url.hash = ""
    url.hostname = url.hostname.toLowerCase()
    if ((url.protocol === "https:" && url.port === "443") || (url.protocol === "http:" && url.port === "80")) url.port = ""
    url.pathname = url.pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/"
    return url.toString()
  } catch {
    return value.trim()
  }
}

export function freezeRecord<T extends Record<string, unknown>>(record: T): Readonly<T> {
  return Object.freeze(record)
}
