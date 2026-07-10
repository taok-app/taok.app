import { franc } from "franc-min"
import { iso6393 } from "iso-639-3"
import { MAX_LANGUAGE_SAMPLE_LENGTH, MINIMUM_LANGUAGE_SAMPLE_LENGTH } from "./constants"

const languageCodes = new Map(iso6393.map((language) => [language.iso6393, language.iso6391]))

/** Resolves a declared language or detects an ISO 639-1/639-3 code from text. */
export function detectLanguage(text: string, declaredLanguage?: string): string | undefined {
  const declared = declaredLanguage?.trim().toLowerCase().split(/[-_]/)[0]
  if (declared && /^[a-z]{2,3}$/.test(declared)) return declared
  const sample = text.slice(0, MAX_LANGUAGE_SAMPLE_LENGTH)
  if (sample.length < MINIMUM_LANGUAGE_SAMPLE_LENGTH) return undefined
  const detected = franc(sample)
  if (detected === "und") return undefined
  return languageCodes.get(detected) ?? detected
}
