import { describe, expect, it } from "vitest"
import { compressContent, decompressContent } from "./compression"

describe("processing compression", () => {
  const content = "compressible research content ".repeat(100)

  it.each(["gzip", "brotli"] as const)("round trips %s content", (algorithm) => {
    const compressed = compressContent(content, algorithm)
    expect(compressed.compressedSize).toBeLessThan(compressed.originalSize)
    expect(compressed.ratio).toBeLessThan(1)
    expect(decompressContent(compressed.data, algorithm)).toBe(content)
    expect(Object.isFrozen(compressed)).toBe(true)
  })

  it("wraps decompression failures", () => {
    expect(() => decompressContent(new Uint8Array([1, 2, 3]), "gzip")).toThrow(/decompress/)
  })
})
