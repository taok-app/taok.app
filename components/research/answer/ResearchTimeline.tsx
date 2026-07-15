'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import type { ResolvedCitation } from '@/types/citations'
import { CitationText } from './CitationText'

export type ResearchTimelineKind = 'info' | 'evidence' | 'milestone'

export interface ResearchTimelineEntry {
  id: string
  /** ISO-8601 timestamp for the entry. */
  at: string
  title: string
  /** Optional detail with inline `[n]` citation markers. */
  detail?: string
  kind?: ResearchTimelineKind
}

export interface ResearchTimelineProps {
  entries: ResearchTimelineEntry[]
  citations?: ResolvedCitation[]
  streaming?: boolean
  className?: string
}

const KIND_DOT: Record<ResearchTimelineKind, string> = {
  info: 'bg-muted-foreground',
  evidence: 'bg-success',
  milestone: 'bg-foreground',
}

function formatTime(iso: string): string {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return ''
  return new Date(t).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

/**
 * Research-run timeline: a chronological account of what Taok did (discovered,
 * extracted, verified, concluded), with citations attached to evidence entries.
 */
function ResearchTimelineImpl({ entries, citations, streaming = false, className }: ResearchTimelineProps) {
  if (entries.length === 0) {
    return (
      <p className={cn('text-xs text-muted-foreground', className)}>
        The research timeline will populate as Taok works.
      </p>
    )
  }

  return (
    <ol className={cn('flex flex-col', className)} aria-label="Research timeline">
      {entries.map((entry, index) => {
        const kind = entry.kind ?? 'info'
        const isLast = index === entries.length - 1
        return (
          <li key={entry.id} className="flex gap-3">
            <span className="w-11 shrink-0 pt-0.5 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
              {formatTime(entry.at)}
            </span>
            <div className="flex flex-col items-center">
              <span className={cn('mt-1 size-2 rounded-full', KIND_DOT[kind])} aria-hidden="true" />
              {!isLast ? <span className="w-px flex-1 bg-border" aria-hidden="true" /> : null}
            </div>
            <div className={cn('min-w-0 flex-1', isLast ? 'pb-0' : 'pb-4')}>
              <p className="text-xs font-medium text-foreground">{entry.title}</p>
              {entry.detail ? (
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground text-pretty">
                  <CitationText text={entry.detail} citations={citations} />
                </p>
              ) : null}
            </div>
          </li>
        )
      })}
      {streaming ? (
        <li className="flex gap-3" aria-hidden="true">
          <span className="w-11 shrink-0" />
          <div className="flex flex-col items-center">
            <span className="mt-1 size-2 animate-pulse rounded-full bg-muted-foreground" />
          </div>
          <div className="flex-1 pt-0.5">
            <span className="text-[11px] text-muted-foreground">Working…</span>
          </div>
        </li>
      ) : null}
    </ol>
  )
}

export const ResearchTimeline = React.memo(ResearchTimelineImpl)
export default ResearchTimeline
