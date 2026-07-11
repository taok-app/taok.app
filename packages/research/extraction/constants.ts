export const REMOVED_ELEMENTS = [
  "script",
  "style",
  "noscript",
  "iframe",
  "svg",
  "canvas",
  "template",
] as const

export const TRACKING_PARAMETERS = new Set([
  "fbclid",
  "gclid",
  "dclid",
  "msclkid",
  "mc_cid",
  "mc_eid",
  "ref",
  "ref_src",
  "source",
])

export const TRACKING_PARAMETER_PREFIXES = ["utm_", "pk_", "ga_"] as const
export const DEFAULT_READING_WORDS_PER_MINUTE = 200
export const ESTIMATED_CHARACTERS_PER_TOKEN = 4
export const MINIMUM_LANGUAGE_SAMPLE_LENGTH = 20
export const MAX_LANGUAGE_SAMPLE_LENGTH = 20_000
export const MINIMUM_READABILITY_TEXT_LENGTH = 20
