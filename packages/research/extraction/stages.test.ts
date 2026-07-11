import { describe, expect, it } from "vitest"
import { resolveCanonicalUrl } from "./canonical"
import { ExtractionError, MarkdownError, MetadataError, ReadabilityError } from "./errors"
import { parseHtml } from "./html"
import { detectLanguage } from "./language"
import { convertToMarkdown } from "./markdown"
import { extractMetadata } from "./metadata"
import { extractReadableContent } from "./readability"
import { sanitizeDocument } from "./sanitize"
import { calculateStatistics } from "./statistics"
import { createDocumentId, isMeaningfulFragment, normalizeInlineText, normalizeText, optionalText } from "./utils"

describe("canonical URL resolution", () => {
  it("normalizes URL components and removes trackers", () => {
    expect(resolveCanonicalUrl("http://EXAMPLE.com:80/a//b/?utm_medium=x&z=2&a=1#top")).toBe("http://example.com/a/b?a=1&z=2")
    expect(resolveCanonicalUrl("https://example.com/base", "../story?fbclid=x#comments")).toBe("https://example.com/story#comments")
    expect(resolveCanonicalUrl("https://example.com/base", "::::")).toBe("https://example.com/::::")
    expect(resolveCanonicalUrl("https://example.com/base", "javascript:alert(1)")).toBe("https://example.com/base")
    expect(resolveCanonicalUrl("https://example.com/base", "http://[invalid")).toBe("https://example.com/base")
    expect(resolveCanonicalUrl("https://example.com:444/", "https://example.com:443/story/")).toBe("https://example.com/story")
  })

  it("rejects an invalid fetched URL", () => {
    expect(() => resolveCanonicalUrl("bad")).toThrow(TypeError)
  })
})

describe("DOM stages", () => {
  it("parses, sanitizes, and removes dangerous attributes and comments", () => {
    const document = parseHtml("<body><p onclick='x()'> Hello&nbsp; world </p><iframe></iframe><!-- no --><div aria-hidden='true'>hidden</div></body>", "https://example.com")
    const clean = sanitizeDocument(document)
    expect(clean.body.innerHTML).toContain("Hello&nbsp; world")
    expect(clean.querySelector("p")?.hasAttribute("onclick")).toBe(false)
    expect(clean.querySelector("iframe")).toBeNull()
    expect(clean.body.textContent).not.toContain("hidden")
  })

  it("falls back for short content and Readability exceptions", () => {
    const result = extractReadableContent(parseHtml("<title>T</title><body><h1>Hello</h1></body>", "https://example.com"))
    expect(result).toMatchObject({ title: "T", text: "Hello" })

    const fallbackDocument = {
      body: { cloneNode: () => ({ innerHTML: "<p>Fallback</p>", textContent: "Fallback" }) },
      cloneNode: () => { throw new Error("clone failed") },
      querySelector: () => null,
      title: "Recovered",
    } as unknown as Document
    expect(extractReadableContent(fallbackDocument)).toMatchObject({ title: "Recovered", text: "Fallback" })
    const bodylessDocument = {
      body: null,
      cloneNode: () => { throw new Error("clone failed") },
      querySelector: () => null,
      title: "",
    } as unknown as Document
    expect(extractReadableContent(bodylessDocument)).toMatchObject({ title: "Untitled", html: "", text: "" })
    expect(() => parseHtml("<p>x</p>", "not a URL")).toThrow(ExtractionError)
  })
})

describe("Markdown and metadata", () => {
  it("preserves semantic Markdown", () => {
    const markdown = convertToMarkdown("<h1>Title</h1><ol><li>One</li></ol><p><img src='a.png' alt='A'> <del>old</del></p>")
    expect(markdown).toContain("# Title")
    expect(markdown).toContain("1. One")
    expect(markdown).toContain("![A](a.png)")
    expect(markdown).toContain("~old~")
    expect(() => convertToMarkdown(null as unknown as string)).toThrow(MarkdownError)
  })

  it("handles missing, repeated, and invalid metadata", () => {
    const metadata = extractMetadata(parseHtml(`<html><head><meta name="keywords" content="one,two"><meta name="tag" content="a"><meta name="tag" content="b"><meta name="tag" content="c"><meta name="empty"><meta content="no-key"><meta property="og:description" content="first"><meta property="og:description" content="second"><meta name="twitter:card" content="summary"><meta name="date" content="invalid"></head></html>`, "https://example.com"))
    expect(metadata.title).toBeUndefined()
    expect(metadata.publishedAt).toBeUndefined()
    expect(metadata.keywords).toEqual(["one", "two"])
    expect(metadata.raw.tag).toEqual(["a", "b", "c"])
    expect(metadata.openGraph.description).toBe("first")
    expect(metadata.twitter.card).toBe("summary")
    expect(() => extractMetadata(null as unknown as Document)).toThrow(MetadataError)
  })
})

describe("language, statistics, and utilities", () => {
  it("detects language and handles insufficient text", () => {
    expect(detectLanguage("This comprehensive English sentence contains enough words to identify the language reliably.")).toBe("en")
    expect(detectLanguage("short")).toBeUndefined()
    expect(detectLanguage("Any text", "pt-BR")).toBe("pt")
    expect(detectLanguage("Any text", "invalid-language")).toBeUndefined()
    expect(detectLanguage("1234567890 ".repeat(20))).toBeUndefined()
  })

  it("calculates exact normalized statistics", () => {
    expect(calculateStatistics("One  two\nthree", "<h1>X</h1><h2>Y</h2><a href='/'>L</a><a>No</a><img src='x'><img src='y'>")).toEqual({
      wordCount: 3,
      characterCount: 13,
      headingCount: 2,
      imageCount: 2,
      linkCount: 1,
      estimatedTokens: 4,
      readingTime: 1,
    })
  })

  it("normalizes values and creates stable IDs", () => {
    expect(normalizeText(" e\u0301\t x\r\n\n\n y ")).toBe("é x\n\ny")
    expect(normalizeInlineText(" a\n b ")).toBe("a b")
    expect(optionalText("   ")).toBeUndefined()
    expect(isMeaningfulFragment("#comments")).toBe(true)
    expect(isMeaningfulFragment("#top")).toBe(false)
    expect(createDocumentId("u", "t")).toBe(createDocumentId("u", "t"))
  })

  it("exposes all typed error classes", () => {
    expect(new ReadabilityError("x").stage).toBe("readability")
    expect(new MarkdownError("x").stage).toBe("markdown")
    expect(new MetadataError("x").stage).toBe("metadata")
  })
})
