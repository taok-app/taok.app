import { describe, expect, it } from "vitest"
import { parseRobots } from "./robots"
import { EMPTY_PROCESSING_STATISTICS, recordProcessingMetric } from "./statistics"
import { assertStorageKey } from "./storage"
import type { DocumentStorage, StorageObject, StoredObject } from "./types"
import { canonicalKey, clamp } from "./utils"

class MemoryStorage implements DocumentStorage {
  private readonly objects = new Map<string, StorageObject>()
  async write(object: Readonly<StorageObject>): Promise<Readonly<StoredObject>> { this.objects.set(object.key, { ...object }); return { key: object.key, size: object.data.byteLength } }
  async read(key: string): Promise<Readonly<StorageObject> | null> { return this.objects.get(key) ?? null }
  async exists(key: string): Promise<boolean> { return this.objects.has(key) }
  async delete(key: string): Promise<void> { this.objects.delete(key) }
}

describe("processing support utilities", () => {
  it("preserves robots directives", () => {
    const robots = parseRobots({ robots: "noindex, nofollow, unavailable_after: 25 Jun 2027 15:00:00 GMT", raw: { robots: ["noarchive"] } })
    expect(robots).toMatchObject({ noindex: true, nofollow: true, noarchive: true })
    expect(robots.unavailableAfter?.toISOString()).toBe("2027-06-25T15:00:00.000Z")
    expect(parseRobots({ robots: "none" })).toMatchObject({ noindex: true, nofollow: true })
    expect(parseRobots({ "og:robots": ["index", 4], robots: "unavailable_after: invalid" })).toMatchObject({ noindex: false, nofollow: false })
  })

  it("accumulates immutable metrics", () => {
    const first = recordProcessingMetric(EMPTY_PROCESSING_STATISTICS, { originalSize: 100, compressedSize: 40, durationMs: 10, duplicate: true })
    const second = recordProcessingMetric(first, { validationFailure: true, durationMs: 2 })
    expect(first).toMatchObject({ documentsProcessed: 1, duplicatesDetected: 1, compressionSavings: 60, averageDocumentSize: 100 })
    expect(second.validationFailures).toBe(1)
    expect(second.processingDurationMs).toBe(12)
    expect(EMPTY_PROCESSING_STATISTICS.documentsProcessed).toBe(0)
    expect(recordProcessingMetric(EMPTY_PROCESSING_STATISTICS, { validationFailure: true })).toMatchObject({ averageDocumentSize: 0, compressionSavings: 0 })
    expect(clamp(2)).toBe(1)
    expect(clamp(-1)).toBe(0)
  })

  it("supports provider-neutral storage contracts", async () => {
    const storage = new MemoryStorage()
    const object = { key: assertStorageKey("documents/a"), data: new Uint8Array([1, 2]), contentType: "text/plain" }
    await expect(storage.write(object)).resolves.toMatchObject({ size: 2 })
    await expect(storage.exists(object.key)).resolves.toBe(true)
    await expect(storage.read(object.key)).resolves.toMatchObject({ contentType: "text/plain" })
    await storage.delete(object.key)
    await expect(storage.read(object.key)).resolves.toBeNull()
    expect(() => assertStorageKey("../secret")).toThrow(/invalid/)
    expect(canonicalKey("not a URL")).toBe("not a URL")
    expect(canonicalKey("https://EXAMPLE.com:443/a//b/#fragment")).toBe("https://example.com/a/b")
    expect(canonicalKey("http://example.com:80")).toBe("http://example.com/")
  })
})
