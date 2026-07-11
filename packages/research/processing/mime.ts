import { DEFAULT_MIME_TYPE, SUPPORTED_MIME_TYPES } from "./constants"
import { MimeError } from "./errors"
import type { SupportedMimeType } from "./types"

export function parseMimeType(value?: string): SupportedMimeType {
  const normalized = (value || DEFAULT_MIME_TYPE).split(";", 1)[0]?.trim().toLowerCase()
  if (!SUPPORTED_MIME_TYPES.includes(normalized as SupportedMimeType)) {
    throw new MimeError(`Unsupported MIME type: ${normalized || "empty"}`)
  }
  return normalized as SupportedMimeType
}

export function detectMimeType(content: string, declared?: string): SupportedMimeType {
  if (declared) return parseMimeType(declared)
  const trimmed = content.trimStart().toLowerCase()
  if (trimmed.startsWith("%pdf-")) return "application/pdf"
  if (/^<\?xml[^>]*?>\s*<(?:html|xhtml:html)\b/.test(trimmed)) return "application/xhtml+xml"
  if (/^(?:<!doctype\s+html|<html\b|<head\b|<body\b|<[a-z][^>]*>)/.test(trimmed)) return "text/html"
  return "text/plain"
}

export function isTextMimeType(value: SupportedMimeType): boolean {
  return value !== "application/pdf"
}
