import { describe, expect, it } from "vitest"
import { ExtractionError, ValidationError } from "./errors"
import { extractDocument } from "./pipeline"

const article = `<!doctype html><html lang="en"><head>
<title>Fallback title</title><meta name="description" content="A useful description">
<meta property="og:title" content="Canonical Article"><meta property="og:site_name" content="Taok News">
<meta name="author" content="Ada Lovelace"><meta name="keywords" content="research, browsers">
<meta name="robots" content="index,follow"><meta property="article:published_time" content="2026-07-01T12:00:00Z">
<link rel="canonical" href="/articles//one/?utm_source=newsletter&b=2&a=1#section">
</head><body><nav>Navigation</nav><article><h1>Canonical Article</h1>
<p>This is a substantial English article with enough meaningful words for Mozilla Readability to identify its primary content correctly.</p>
<h2 id="section">Details</h2><p>It includes <strong>bold text</strong>, <em>emphasis</em>, and <a href="/source">a source</a>.</p>
<ul><li>First item</li><li>Second item</li></ul><blockquote>An important quote.</blockquote>
<pre><code>const value = 1;</code></pre><table><thead><tr><th>Name</th></tr></thead><tbody><tr><td>Taok</td></tr></tbody></table>
<img src="/image.jpg" alt="Research chart"><script>alert(1)</script><p hidden>Secret</p><!-- comment --></article></body></html>`

describe("extractDocument", () => {
  it("runs the complete pipeline deterministically", () => {
    const result = extractDocument({ url: "HTTPS://Example.COM:443/source/?utm_campaign=x", html: article })
    expect(result.title).toBe("Canonical Article")
    expect(result.canonicalUrl).toBe("https://example.com/articles/one?a=1&b=2#section")
    expect(result.description).toBe("A useful description")
    expect(result.author).toBe("Ada Lovelace")
    expect(result.siteName).toBe("Taok News")
    expect(result.language).toBe("en")
    expect(result.publishedAt?.toISOString()).toBe("2026-07-01T12:00:00.000Z")
    expect(result.html).not.toContain("alert(1)")
    expect(result.text).not.toContain("Secret")
    expect(result.markdown).toContain("## Details")
    expect(result.markdown).toContain("**bold text**")
    expect(result.markdown).toContain("| Name |")
    expect(result.headingCount).toBeGreaterThanOrEqual(1)
    expect(result.imageCount).toBe(1)
    expect(result.linkCount).toBe(1)
    expect(result.id).toHaveLength(64)
    expect(extractDocument({ url: "https://example.com/source/", html: article }).id).toBe(result.id)
    expect(result.metadata).toMatchObject({ keywords: ["research", "browsers"], robots: "index,follow" })
  })

  it("handles malformed and empty HTML through body fallback", () => {
    const malformed = extractDocument({ url: "https://example.com/path", html: "<html><body><h1>Broken<p>short<script>x" })
    expect(malformed.title).toBe("Brokenshort")
    expect(malformed.text).toContain("Brokenshort")
    expect(malformed.markdown).toContain("# Broken")

    const empty = extractDocument({ url: "https://example.com", html: "" })
    expect(empty.title).toBe("Untitled")
    expect(empty.text).toBe("")
    expect(empty.wordCount).toBe(0)
    expect(empty.readingTime).toBe(0)
  })

  it("supports large and multilingual documents", () => {
    const paragraph = "La investigación moderna ayuda a los equipos a comprender información compleja y tomar mejores decisiones. "
    const result = extractDocument({
      url: "https://example.es/investigacion",
      html: `<html><body><article><h1>Investigación</h1>${`<p>${paragraph}</p>`.repeat(500)}</article></body></html>`,
    })
    expect(result.language).toBe("es")
    expect(result.wordCount).toBeGreaterThan(5_000)
    expect(result.readingTime).toBeGreaterThan(20)
  })

  it("uses a valid declared language", () => {
    const result = extractDocument({ url: "https://example.com", html: "<html lang='fr-CA'><body><p>Un texte court.</p></body></html>" })
    expect(result.language).toBe("fr")
  })

  it.each(["not a url", "ftp://example.com/file"])("rejects invalid URL %s", (url) => {
    expect(() => extractDocument({ url, html: "<p>text</p>" })).toThrow(ValidationError)
  })

  it("wraps non-extraction failures", () => {
    expect(() => extractDocument(null as unknown as { url: string; html: string })).toThrow(ExtractionError)
    const input = Object.create(null, {
      html: { value: "<p>text</p>" },
      url: { get: () => { throw new Error("getter failed") } },
    }) as { url: string; html: string }
    expect(() => extractDocument(input)).toThrowError(/Document extraction failed/)
  })
})
