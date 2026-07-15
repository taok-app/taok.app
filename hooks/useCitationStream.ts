'use client'

import React from 'react'
import type {
  CitationStreamEvent,
  ResearchSource,
  ResolvedCitation,
} from '@/types/citations'
import {
  emptyCitationState,
  isCitationStreamEvent,
  reduceCitationEvent,
  referenceMap,
  resolveCitations,
} from '@/packages/research/citations'

export interface UseCitationStreamResult {
  /** Citations resolved against their sources, in stable reference order. */
  citations: ResolvedCitation[]
  /** All sources collected so far. */
  sources: ResearchSource[]
  /** citationId -> reference number. */
  references: Record<string, number>
  /** sourceId -> number of citations referencing it. */
  citationCounts: Record<string, number>
  /** Apply a single streaming event (safe against duplicates / out-of-order). */
  apply: (event: CitationStreamEvent) => void
  /** Apply an unknown value, ignored unless it is a valid citation event. */
  applyUnknown: (value: unknown) => void
  /** Reset back to an empty state (e.g. on a new research run). */
  reset: () => void
}

/**
 * Client-side accumulator for citation/source streaming events. Wraps the pure
 * reducer in `packages/research/citations` so the same logic that is unit
 * tested drives the UI. Citations render incrementally as events arrive —
 * there is no wait for a final response.
 *
 * Pass `initialEvents` to hydrate from a server-rendered snapshot.
 */
export function useCitationStream(
  initialEvents: readonly CitationStreamEvent[] = [],
): UseCitationStreamResult {
  const [state, setState] = React.useState(() =>
    initialEvents.reduce(reduceCitationEvent, emptyCitationState()),
  )

  const apply = React.useCallback((event: CitationStreamEvent) => {
    setState((current) => reduceCitationEvent(current, event))
  }, [])

  const applyUnknown = React.useCallback((value: unknown) => {
    if (isCitationStreamEvent(value)) {
      setState((current) => reduceCitationEvent(current, value))
    }
  }, [])

  const reset = React.useCallback(() => setState(emptyCitationState()), [])

  const citations = React.useMemo(() => resolveCitations(state), [state])
  const sources = React.useMemo(() => Object.values(state.sources), [state])
  const references = React.useMemo(() => referenceMap(state), [state])

  const citationCounts = React.useMemo(() => {
    const counts: Record<string, number> = {}
    for (const id of state.order) {
      const citation = state.citations[id]
      if (!citation) continue
      counts[citation.sourceId] = (counts[citation.sourceId] ?? 0) + 1
    }
    return counts
  }, [state])

  return { citations, sources, references, citationCounts, apply, applyUnknown, reset }
}
