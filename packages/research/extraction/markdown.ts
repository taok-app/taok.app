import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"
import { MarkdownError } from "./errors"
import { normalizeText } from "./utils"

/** Converts sanitized article HTML into semantic GitHub-flavored Markdown. */
export function convertToMarkdown(html: string): string {
  try {
    const service = new TurndownService({
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      emDelimiter: "_",
      headingStyle: "atx",
      strongDelimiter: "**",
    })
    service.use(gfm)
    service.remove(["script", "style", "noscript", "iframe"])
    return normalizeText(service.turndown(html))
  } catch (cause) {
    throw new MarkdownError("Unable to convert extracted HTML to Markdown", { cause })
  }
}
