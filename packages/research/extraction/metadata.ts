import { MetadataError } from "./errors"
import type { ExtractedMetadata } from "./types"
import { optionalText } from "./utils"

function first(document: Document, selectors: string[]): string | undefined {
  for (const selector of selectors) {
    const element = document.querySelector(selector)
    const value = element?.getAttribute("content") ?? element?.getAttribute("href") ?? element?.textContent
    const normalized = optionalText(value)
    if (normalized) return normalized
  }
}

function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

/** Extracts resilient standard, OpenGraph, and Twitter metadata. */
export function extractMetadata(document: Document): ExtractedMetadata {
  try {
    const raw: Record<string, string | string[]> = {}
    const openGraph: Record<string, string> = {}
    const twitter: Record<string, string> = {}

    document.querySelectorAll("meta[name], meta[property]").forEach((meta) => {
      const key = optionalText(meta.getAttribute("property") ?? meta.getAttribute("name"))?.toLowerCase()
      const value = optionalText(meta.getAttribute("content"))
      if (!key || !value) return
      const current = raw[key]
      raw[key] = current ? (Array.isArray(current) ? [...current, value] : [current, value]) : value
      if (key.startsWith("og:")) openGraph[key.slice(3)] ??= value
      if (key.startsWith("twitter:")) twitter[key.slice(8)] ??= value
    })

    const title = first(document, ["meta[property='og:title' i]", "meta[name='twitter:title' i]", "title"])
    const description = first(document, ["meta[property='og:description' i]", "meta[name='twitter:description' i]", "meta[name='description' i]"])
    const author = first(document, ["meta[name='author' i]", "meta[property='article:author' i]"])
    const keywordsValue = first(document, ["meta[name='keywords' i]"])
    const language = optionalText(document.documentElement.getAttribute("lang"))?.split(/[-_]/)[0]?.toLowerCase()
    const canonical = first(document, ["link[rel~='canonical' i]"])
    const publishedValue = first(document, ["meta[property='article:published_time' i]", "meta[name='date' i]", "time[datetime]"])

    return {
      title,
      description,
      author,
      keywords: keywordsValue?.split(",").map((item) => item.trim()).filter(Boolean),
      robots: first(document, ["meta[name='robots' i]"]),
      canonical,
      publishedAt: parseDate(publishedValue),
      language,
      siteName: first(document, ["meta[property='og:site_name' i]", "meta[name='application-name' i]"]),
      openGraph,
      twitter,
      raw,
    }
  } catch (cause) {
    throw new MetadataError("Unable to extract document metadata", { cause })
  }
}
