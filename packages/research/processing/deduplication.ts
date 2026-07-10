import { DEFAULT_NEAR_DUPLICATE_THRESHOLD } from "./constants"
import { DuplicateDetectionError } from "./errors"
import { createFingerprint, fingerprintSimilarity } from "./fingerprint"
import type { DuplicateCandidate, DuplicateResult } from "./types"
import { canonicalKey, clamp, normalizeText } from "./utils"

export interface DuplicateInput {
  canonicalUrl: string
  sha256: string
  fingerprint: string
  text: string
}

function wordSimilarity(left: string, right: string): number {
  const leftWords = new Set(normalizeText(left).toLowerCase().split(/\s+/).filter(Boolean))
  const rightWords = new Set(normalizeText(right).toLowerCase().split(/\s+/).filter(Boolean))
  if (leftWords.size === 0 && rightWords.size === 0) return 1
  let intersection = 0
  for (const word of leftWords) if (rightWords.has(word)) intersection += 1
  return clamp(intersection / (leftWords.size + rightWords.size - intersection))
}

export function detectDuplicate(
  input: DuplicateInput,
  candidates: readonly DuplicateCandidate[] = [],
  nearThreshold = DEFAULT_NEAR_DUPLICATE_THRESHOLD,
): Readonly<DuplicateResult> {
  try {
    if (nearThreshold < 0 || nearThreshold > 1 || !Number.isFinite(nearThreshold)) {
      throw new DuplicateDetectionError("Near-duplicate threshold must be between zero and one")
    }
    let best: DuplicateResult = { isDuplicate: false, confidence: 0 }
    for (const candidate of candidates) {
      if (candidate.sha256 === input.sha256) {
        return Object.freeze({ isDuplicate: true, duplicateOf: candidate.id, kind: "hash", confidence: 1 })
      }
      if (canonicalKey(candidate.canonicalUrl) === canonicalKey(input.canonicalUrl)) {
        return Object.freeze({ isDuplicate: true, duplicateOf: candidate.id, kind: "canonical", confidence: 0.99 })
      }
      const fingerprintScore = fingerprintSimilarity(input.fingerprint, candidate.fingerprint)
      if (candidate.fingerprint === input.fingerprint) {
        return Object.freeze({ isDuplicate: true, duplicateOf: candidate.id, kind: "fingerprint", confidence: 0.98 })
      }
      const contentScore = candidate.text ? wordSimilarity(input.text, candidate.text) : 0
      const confidence = Math.max(fingerprintScore, contentScore)
      if (confidence >= nearThreshold && confidence > best.confidence) {
        best = { isDuplicate: true, duplicateOf: candidate.id, kind: "near-content", confidence }
      }
    }
    return Object.freeze(best)
  } catch (error) {
    if (error instanceof DuplicateDetectionError) throw error
    throw new DuplicateDetectionError("Unable to detect duplicate document", error)
  }
}

export function candidateFromText(id: string, canonicalUrl: string, sha256: string, text: string): DuplicateCandidate {
  return Object.freeze({ id, canonicalUrl, sha256, text, fingerprint: createFingerprint(text) })
}
