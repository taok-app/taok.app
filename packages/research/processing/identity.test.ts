import { describe, expect, it } from "vitest"
import { detectDuplicate } from "./deduplication"
import { createFingerprint, fingerprintSimilarity } from "./fingerprint"
import { sha256, stableDocumentId } from "./hashing"

describe("processing identity", () => {
  it("produces stable whitespace-normalized hashes and IDs", () => {
    const first = sha256("Hello   world\r\nNext")
    const second = sha256("Hello world\nNext")
    expect(first).toBe(second)
    expect(sha256("Changed")).not.toBe(first)
    expect(stableDocumentId(first)).toBe(`doc_${first.slice(0, 32)}`)
    expect(() => stableDocumentId("bad")).toThrow()
  })

  it("produces deterministic similar fingerprints", () => {
    const original = createFingerprint("the quick brown fox jumps over the lazy dog")
    const same = createFingerprint("the quick brown fox jumps over the lazy dog")
    const near = createFingerprint("the quick brown fox jumps over a lazy dog")
    expect(original).toBe(same)
    expect(fingerprintSimilarity(original, same)).toBe(1)
    expect(fingerprintSimilarity(original, near)).toBeGreaterThan(0.7)
    expect(fingerprintSimilarity("bad", near)).toBe(0)
    expect(createFingerprint("")).toMatch(/^[a-f0-9]{16}$/)
    expect(createFingerprint("one two")).toMatch(/^[a-f0-9]{16}$/)
  })

  it("detects hash, canonical, fingerprint and near duplicates", () => {
    const input = { canonicalUrl: "https://example.com/story", sha256: "abc", fingerprint: createFingerprint("alpha beta gamma delta"), text: "alpha beta gamma delta" }
    expect(detectDuplicate(input, [{ id: "hash", canonicalUrl: "https://other.com", sha256: "abc", fingerprint: "0".repeat(16) }])).toMatchObject({ duplicateOf: "hash", kind: "hash", confidence: 1 })
    expect(detectDuplicate(input, [{ id: "url", canonicalUrl: "https://EXAMPLE.com/story/", sha256: "def", fingerprint: "0".repeat(16) }])).toMatchObject({ duplicateOf: "url", kind: "canonical" })
    expect(detectDuplicate(input, [{ id: "fingerprint", canonicalUrl: "https://other.com", sha256: "def", fingerprint: input.fingerprint }])).toMatchObject({ duplicateOf: "fingerprint", kind: "fingerprint" })
    expect(detectDuplicate(input, [{ id: "near", canonicalUrl: "https://other.com", sha256: "def", fingerprint: createFingerprint("alpha beta gamma changed"), text: "alpha beta gamma changed" }], 0.5)).toMatchObject({ duplicateOf: "near", kind: "near-content" })
    expect(detectDuplicate(input)).toEqual({ isDuplicate: false, confidence: 0 })
    expect(detectDuplicate(input, [{ id: "different", canonicalUrl: "https://other.com", sha256: "def", fingerprint: "0".repeat(16) }], 1)).toEqual({ isDuplicate: false, confidence: 0 })
    expect(() => detectDuplicate(input, [], 2)).toThrow()
    expect(() => detectDuplicate(input, [null as unknown as { id: string; canonicalUrl: string; sha256: string; fingerprint: string }])).toThrow(/detect duplicate/)
  })
})
