import { REMOVED_ELEMENTS } from "./constants"

const HIDDEN_SELECTOR = [
  "[hidden]",
  "[aria-hidden='true']",
  "[inert]",
  "[style*='display: none' i]",
  "[style*='display:none' i]",
  "[style*='visibility: hidden' i]",
  "[style*='visibility:hidden' i]",
].join(",")

/** Removes executable, non-content, commented, and explicitly hidden DOM content. */
export function sanitizeDocument(document: Document): Document {
  const sanitized = document.cloneNode(true) as Document
  sanitized.querySelectorAll([...REMOVED_ELEMENTS, HIDDEN_SELECTOR].join(",")).forEach((node) => node.remove())

  const walker = sanitized.createTreeWalker(sanitized, 128)
  const comments: Node[] = []
  while (walker.nextNode()) comments.push(walker.currentNode)
  comments.forEach((comment) => comment.parentNode?.removeChild(comment))

  sanitized.querySelectorAll("*").forEach((element) => {
    for (const attribute of [...element.attributes]) {
      if (/^on/i.test(attribute.name) || attribute.name === "srcdoc") element.removeAttribute(attribute.name)
    }
  })
  return sanitized
}
