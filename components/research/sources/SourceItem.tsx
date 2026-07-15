'use client'

import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ResearchSource } from '@/types/citations'
import { sourceTypeLabel } from '@/packages/research/citations'
import { SOURCE_TYPE_ICON } from '@/components/research/citations/sourceIcons'
import { SourceTrustScore } from '@/components/research/citations/SourceTrustScore'
import { VerificationBadge } from '@/components/research/citations/VerificationBadge'

interface SourceItemProps {
  source: ResearchSource
  /** How many citations reference this source. */
  citationCount?: number
  active?: boolean
  onSelect?: (source: ResearchSource) => void
}

export function SourceItem({ source, citationCount = 0, active = false, onSelect }: SourceItemProps) {
  const Icon = SOURCE_TYPE_ICON[source.type]

  return (
    <button
      type="button"
      onClick={() => onSelect?.(source)}
      aria-pressed={active}
      className={cn(
        'group flex w-full items-start gap-3 rounded-lg border border-border bg-card px-3 py-3 text-left transition-colors',
        'hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active && 'border-primary/60 bg-accent',
      )}
    >
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-medium text-foreground">{source.title}</span>
          {source.url ? (
            <ExternalLink
              className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          ) : null}
        </span>

        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/70">{source.provider}</span>
          <span aria-hidden="true">·</span>
          <span>{sourceTypeLabel(source.type)}</span>
          {source.domain ? (
            <>
              <span aria-hidden="true">·</span>
              <span className="truncate">{source.domain}</span>
            </>
          ) : null}
        </span>

        <span className="mt-0.5 flex flex-wrap items-center gap-2">
          <SourceTrustScore score={source.trustScore} size="sm" />
          <VerificationBadge status={source.verification} size="sm" />
          {citationCount > 0 ? (
            <span className="text-xs text-muted-foreground">
              {citationCount} citation{citationCount === 1 ? '' : 's'}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  )
}
