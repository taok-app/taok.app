import { describe, expect, it } from "vitest"
import type { ExtractedDocument } from "../extraction/types"
import { detectMimeType, parseMimeType } from "./mime"
import { isLikelyBinary, validateDocument } from "./validation"

function document(content = "<html><body>Hello world</body></html>"): ExtractedDocument {
  return { id: "source", url: "https://example.com", canonicalUrl: "https://example.com", title: "Hello", html: content, markdown: "Hello world", text: "Hello world", language: "en", wordCount: 2, characterCount: 11, headingCount: 0, imageCount: 0, linkCount: 0, estimatedTokens: 3, readingTime: 1, metadata: {} }
}

describe("MIME detection and validation", () => {
  it("detects supported content types", () => {
    expect(detectMimeType("<!doctype html><html></html>")).toBe("text/html")
    expect(detectMimeType("<?xml version='1.0'?><html></html>")).toBe("application/xhtml+xml")
    expect(detectMimeType("%PDF-1.7")).toBe("application/pdf")
    expect(detectMimeType("plain words")).toBe("text/plain")
    expect(parseMimeType("text/html; charset=UTF-8")).toBe("text/html")
    expect(parseMimeType()).toBe("text/html")
    expect(detectMimeType("plain words", "text/plain")).toBe("text/plain")
    expect(() => parseMimeType("image/png")).toThrow(/Unsupported MIME/)
  })

  it("rejects empty, binary, corrupt, oversized and invalid encoding content", () => {
    expect(() => validateDocument(document(""), { mimeType: "text/html" })).not.toThrow()
    expect(() => validateDocument(document(""), { maxDocumentSize: 0 })).toThrow(/positive/)
    expect(() => validateDocument({ ...document(""), text: "", markdown: "" })).toThrow(/empty/)
    expect(isLikelyBinary("hello\u0000world")).toBe(true)
    expect(() => validateDocument(document("hello\u0000world"))).toThrow(/Binary/)
    expect(() => validateDocument(document("bad\ufffd\ufffd\ufffdvalue"))).toThrow(/corrupted/)
    expect(() => validateDocument(document("long content"), { maxDocumentSize: 2 })).toThrow(/exceeds/)
    expect(() => validateDocument(document(), { maxDocumentSize: 0 })).toThrow(/positive/)
    expect(() => validateDocument(document(), { encoding: "utf-16" })).toThrow(/encoding/)
    expect(() => validateDocument(document(), { mimeType: "image/jpeg" })).toThrow(/MIME/)
    expect(() => validateDocument(null as unknown as ExtractedDocument)).toThrow(/required/)
    expect(isLikelyBinary("")).toBe(false)
    expect(isLikelyBinary("hello\nworld")).toBe(false)
    expect(isLikelyBinary("\u0001\u0002normal")).toBe(true)
  })

  it("returns immutable validation details", () => {
    const result = validateDocument(document(), { encoding: "UTF8" })
    expect(result).toMatchObject({ mimeType: "text/html", encoding: "utf8" })
    expect(Object.isFrozen(result)).toBe(true)
  })
})
