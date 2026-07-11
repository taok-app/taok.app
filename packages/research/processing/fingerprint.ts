import { createHash } from "node:crypto"
import { FINGERPRINT_BITS, FINGERPRINT_HEX_LENGTH, SHINGLE_SIZE } from "./constants"
import { HashingError } from "./errors"
import { clamp, normalizeText } from "./utils"

function tokens(content: string): string[] {
  return normalizeText(content).toLocaleLowerCase("en").match(/[\p{L}\p{N}]+/gu) ?? []
}

function shingles(content: string): string[] {
  const words = tokens(content)
  if (words.length === 0) return [""]
  if (words.length < SHINGLE_SIZE) return [words.join(" ")]
  return Array.from({ length: words.length - SHINGLE_SIZE + 1 }, (_, index) => words.slice(index, index + SHINGLE_SIZE).join(" "))
}

export function createFingerprint(content: string): string {
  try {
    const weights = new Int32Array(FINGERPRINT_BITS)
    for (const shingle of shingles(content)) {
      const digest = createHash("sha256").update(shingle, "utf8").digest()
      for (let bit = 0; bit < FINGERPRINT_BITS; bit += 1) {
        const isSet = (digest[Math.floor(bit / 8)]! & (1 << (7 - (bit % 8)))) !== 0
        weights[bit] += isSet ? 1 : -1
      }
    }
    const zero = BigInt(0)
    const one = BigInt(1)
    let result = zero
    for (const weight of weights) result = (result << one) | (weight >= 0 ? one : zero)
    return result.toString(16).padStart(FINGERPRINT_HEX_LENGTH, "0")
  } catch (error) {
    throw new HashingError("Unable to generate document fingerprint", error)
  }
}

export function fingerprintSimilarity(left: string, right: string): number {
  if (!/^[a-f0-9]{16}$/i.test(left) || !/^[a-f0-9]{16}$/i.test(right)) return 0
  const zero = BigInt(0)
  const one = BigInt(1)
  let different = BigInt(`0x${left}`) ^ BigInt(`0x${right}`)
  let distance = 0
  while (different > zero) {
    distance += Number(different & one)
    different >>= one
  }
  return clamp(1 - distance / FINGERPRINT_BITS)
}
