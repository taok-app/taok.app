'use client'

import React from 'react'
import type { ResolvedCitation } from '@/types/citations'
import { CitationBadge } from '@/components/research/citations/CitationBadge'
import { useCitations } from '@/components/research/citations/CitationContext'

export interface CitationTextProps {
  /**
   * Text containing inline citation markers in the form `[1]`, `[2]`, ...
   * Each marker is replaced by an interactive `CitationBadge` resolved against
   * the citation context (or the `citations` prop).
   */
  text: string
  /** Explicit citations; falls back to the citation context. */
  citations?: ResolvedCitation[]
  className?: string
}

const MARKER = /\[(\d+)\]/g

/**
 * Renders answer text with inline, clickable citation references. Markers that
 * do not resolve to a known citation are left as plain text, so partial /
 * streaming text never renders a broken badge.
 */
function CitationTextImpl({ text, citations, className }: CitationTextProps) {
  const ctx = useCitations()
  const items = citations ?? ctx?.citations ?? []

  const byReference = React.useMemo(() => {
    const map = new Map<number, ResolvedCitation>()
    for (const citation of items) map.set(citation.reference, citation)
    return map
  }, [items])

  const nodes = React.useMemo<React.ReactNode[]>(() => {
    const out: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    MARKER.lastIndex = 0
    let key = 0
    while ((match = MARKER.exec(text)) !== null) {
      const [raw, num] = match
      const reference = Number(num)
      const citation = byReference.get(reference)
      if (match.index > lastIndex) {
        out.push(<span key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</span>)
      }
      if (citation) {
        out.push(
          <CitationBadge
            key={`c-${key++}`}
            reference={citation.reference}
            citationId={citation.id}
            confidence={citation.confidence}
            verification={citation.verification}
          />,
        )
      } else {
        // Unresolved marker (source may not have streamed in yet): keep literal.
        out.push(<span key={`t-${key++}`}>{raw}</span>)
      }
      lastIndex = match.index + raw.length
    }
    if (lastIndex < text.length) {
      out.push(<span key={`t-${key++}`}>{text.slice(lastIndex)}</span>)
    }
    return out
  }, [text, byReference])

  return <span className={className}>{nodes}</span>
}

export const CitationText = React.memo(CitationTextImpl)
export default CitationText
