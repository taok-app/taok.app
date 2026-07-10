import { describe, expect, it } from "vitest"
import type { ExtractedDocument } from "../extraction/types"
import { processDocument } from "./processor"

function document(overrides: Partial<ExtractedDocument> = {}): ExtractedDocument {
  return {
    id: "source-id",
    url: "https://example.com/story",
    canonicalUrl: "https://example.com/story",
    title: " Research  Story ",
    html: "<article>\n  <h1>Research Story</h1><p>Stable content for processing.</p>\n</article>",
    markdown: "# Research Story\n\nStable content for processing.",
    text: "Research Story Stable content for processing.",
    language: "en",
    wordCount: 6,
    characterCount: 45,
    headingCount: 1,
    imageCount: 0,
    linkCount: 0,
    estimatedTokens: 12,
    readingTime: 1,
    metadata: { robots: "noindex, noarchive" },
    ...overrides,
  }
}

describe("document processor", () => {
  it("creates an immutable deterministic research asset", () => {
    const createdAt = new Date("2026-07-11T12:00:00Z")
    const first = processDocument(document(), { compression: "gzip", createdAt })
    const second = processDocument(document({ html: "<article><h1>Research Story</h1><p>Stable content for processing.</p></article>" }), { compression: "gzip", createdAt })
    expect(first.document.id).toBe(second.document.id)
    expect(first.document.sha256).toBe(second.document.sha256)
    expect(first.document).toMatchObject({ mimeType: "text/html", encoding: "utf-8", language: "en", isDuplicate: false })
    expect(first.document.createdAt).toEqual(createdAt)
    expect(first.document.metadata).toMatchObject({ robots: { noindex: true, noarchive: true } })
    expect(first.compressed.compressedSize).toBe(first.document.compressedSize)
    expect(Object.isFrozen(first.document)).toBe(true)
    expect(document().title).toContain("  ")
    const plain = processDocument(document({ html: "plain content" }), { mimeType: "text/plain", encoding: "ascii", maxDocumentSize: 1_000, nearDuplicateThreshold: 0.9, compression: "gzip", createdAt })
    expect(plain.document).toMatchObject({ mimeType: "text/plain", encoding: "ascii" })
  })

  it("marks duplicate candidates without changing source content", () => {
    const initial = processDocument(document(), { createdAt: new Date(0) })
    const duplicate = processDocument(document(), {
      createdAt: new Date(1),
      duplicateCandidates: [{ id: initial.document.id, canonicalUrl: initial.document.canonicalUrl, sha256: initial.document.sha256, fingerprint: initial.document.fingerprint }],
    })
    expect(duplicate.document).toMatchObject({ isDuplicate: true, duplicateOf: initial.document.id })
    expect(duplicate.duplicate.confidence).toBe(1)
    const undetermined = processDocument(document({ language: undefined, html: "", text: "plain fallback", markdown: "" }), { mimeType: "text/plain", createdAt: new Date(2) })
    expect(undetermined.document).toMatchObject({ language: "und", originalSize: 14 })
  })

  it("surfaces typed validation failures", () => {
    expect(() => processDocument(document({ html: "", text: "", markdown: "" }))).toThrow(/empty/)
    expect(() => processDocument(document(), { createdAt: { valueOf: () => { throw new Error("bad date") } } as unknown as Date })).toThrow(/processing failed/)
  })
})
