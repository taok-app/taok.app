import type { RobotsDirectives } from "./types"

function collectRaw(metadata: Readonly<Record<string, unknown>>): string[] {
  const values: string[] = []
  for (const [key, value] of Object.entries(metadata)) {
    const normalizedKey = key.toLowerCase()
    if (normalizedKey === "robots" || normalizedKey === "googlebot" || normalizedKey.endsWith(":robots")) {
      if (typeof value === "string") values.push(value)
      else if (Array.isArray(value)) values.push(...value.filter((item): item is string => typeof item === "string"))
    }
  }
  const raw = metadata.raw
  if (raw && typeof raw === "object" && !Array.isArray(raw)) values.push(...collectRaw(raw as Record<string, unknown>))
  return values
}

export function parseRobots(metadata: Readonly<Record<string, unknown>>): Readonly<RobotsDirectives> {
  const raw = collectRaw(metadata)
  const directives = raw.flatMap((value) => value.split(/[,;]/)).map((value) => value.trim()).filter(Boolean)
  let unavailableAfter: Date | undefined
  for (const directive of directives) {
    const match = directive.match(/^unavailable_after\s*:\s*(.+)$/i)
    if (match) {
      const parsed = new Date(match[1]!)
      if (!Number.isNaN(parsed.getTime())) unavailableAfter = parsed
    }
  }
  const names = new Set(directives.map((directive) => directive.split(":", 1)[0]!.toLowerCase()))
  return Object.freeze({
    noindex: names.has("noindex") || names.has("none"),
    nofollow: names.has("nofollow") || names.has("none"),
    noarchive: names.has("noarchive"),
    ...(unavailableAfter ? { unavailableAfter } : {}),
    raw: Object.freeze([...raw]),
  })
}
