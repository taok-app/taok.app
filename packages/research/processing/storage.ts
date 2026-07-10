export type {
  DocumentReader,
  DocumentStorage,
  DocumentWriter,
  StorageObject,
  StoredObject,
} from "./types"
import { StorageError } from "./errors"

export { StorageError }

export function assertStorageKey(key: string): string {
  const normalized = key.trim().replace(/^\/+/, "")
  if (!normalized || normalized.includes("..") || normalized.includes("\\")) {
    throw new StorageError("Storage key is invalid")
  }
  return normalized
}
