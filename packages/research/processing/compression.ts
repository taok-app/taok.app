import { brotliCompressSync, brotliDecompressSync, constants, gunzipSync, gzipSync } from "node:zlib"
import { CompressionError } from "./errors"
import type { CompressionAlgorithm, CompressionResult } from "./types"

export function compressContent(content: string, algorithm: CompressionAlgorithm = "brotli"): Readonly<CompressionResult> {
  try {
    const input = Buffer.from(content, "utf8")
    const data = algorithm === "gzip"
      ? gzipSync(input, { level: 9 })
      : brotliCompressSync(input, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } })
    return Object.freeze({
      algorithm,
      data: new Uint8Array(data),
      originalSize: input.byteLength,
      compressedSize: data.byteLength,
      ratio: input.byteLength === 0 ? 0 : data.byteLength / input.byteLength,
    })
  } catch (error) {
    throw new CompressionError(`Unable to compress content with ${algorithm}`, error)
  }
}

export function decompressContent(data: Uint8Array, algorithm: CompressionAlgorithm): string {
  try {
    const output = algorithm === "gzip" ? gunzipSync(data) : brotliDecompressSync(data)
    return output.toString("utf8")
  } catch (error) {
    throw new CompressionError(`Unable to decompress ${algorithm} content`, error)
  }
}
