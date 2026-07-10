import { JSDOM } from "jsdom"
import { ExtractionError } from "./errors"

/** Parses malformed HTML into a standards-compliant DOM using the fetched URL as base. */
export function parseHtml(html: string, url: string): Document {
  try {
    return new JSDOM(html, { url, contentType: "text/html" }).window.document
  } catch (cause) {
    throw new ExtractionError("Unable to parse HTML", "parsing", { cause })
  }
}
