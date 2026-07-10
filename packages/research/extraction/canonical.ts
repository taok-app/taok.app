import { TRACKING_PARAMETER_PREFIXES, TRACKING_PARAMETERS } from "./constants"
import { isMeaningfulFragment } from "./utils"

function isTrackingParameter(key: string): boolean {
  const lower = key.toLowerCase()
  return TRACKING_PARAMETERS.has(lower) || TRACKING_PARAMETER_PREFIXES.some((prefix) => lower.startsWith(prefix))
}

/** Resolves and deterministically normalizes a canonical URL. */
export function resolveCanonicalUrl(fetchedUrl: string, declaredCanonical?: string): string {
  let fallback: URL
  try {
    fallback = new URL(fetchedUrl)
  } catch {
    throw new TypeError("Fetched URL must be an absolute HTTP(S) URL")
  }

  let url = fallback
  if (declaredCanonical) {
    try {
      const candidate = new URL(declaredCanonical, fallback)
      if (candidate.protocol === "http:" || candidate.protocol === "https:") url = candidate
    } catch {
      url = fallback
    }
  }

  url.hostname = url.hostname.toLowerCase()
  if ((url.protocol === "http:" && url.port === "80") || (url.protocol === "https:" && url.port === "443")) url.port = ""
  url.pathname = url.pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/"
  for (const key of [...url.searchParams.keys()]) if (isTrackingParameter(key)) url.searchParams.delete(key)
  url.searchParams.sort()
  if (!isMeaningfulFragment(url.hash)) url.hash = ""
  return url.toString()
}
