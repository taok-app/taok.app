'use client'

import React from 'react'
import { ShieldCheck, TriangleAlert, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ResearchSource, SourceType } from '@/types/citations'
import {
  filterSources,
  sortSources,
  summarizeSources,
  type SourceFilters,
  type SourceSortKey,
} from '@/packages/research/citations'
import { useWindowedList } from '@/hooks/useWindowedList'
import { SourceSearch } from './SourceSearch'
import { SourceFilter } from './SourceFilter'
import { SourceItem } from './SourceItem'

export interface ResearchSourcesProps {
  sources: ResearchSource[]
  /** Map of sourceId -> number of citations referencing it. */
  citationCounts?: Record<string, number>
  activeSourceId?: string
  onSelectSource?: (source: ResearchSource) => void
  className?: string
}

/**
 * The sources panel: a searchable, filterable, sortable evidence list with a
 * trust summary header. Uses incremental rendering to stay smooth with many
 * sources.
 */
function ResearchSourcesImpl({
  sources,
  citationCounts,
  activeSourceId,
  onSelectSource,
  className,
}: ResearchSourcesProps) {
  const [query, setQuery] = React.useState('')
  const [activeTypes, setActiveTypes] = React.useState<SourceType[]>([])
  const [sort, setSort] = React.useState<SourceSortKey>('trust')

  const availableTypes = React.useMemo(() => {
    const set = new Set<SourceType>()
    for (const s of sources) set.add(s.type)
    return Array.from(set)
  }, [sources])

  const typeCounts = React.useMemo(() => {
    const counts: Partial<Record<SourceType, number>> = {}
    for (const s of sources) counts[s.type] = (counts[s.type] ?? 0) + 1
    return counts
  }, [sources])

  const filtered = React.useMemo(() => {
    const filters: SourceFilters = {
      query,
      types: activeTypes.length > 0 ? activeTypes : undefined,
    }
    return sortSources(filterSources(sources, filters), sort)
  }, [sources, query, activeTypes, sort])

  const summary = React.useMemo(() => summarizeSources(sources), [sources])
  const { visible, hasMore, sentinelRef } = useWindowedList(filtered, { batchSize: 30 })

  const toggleType = React.useCallback((type: SourceType) => {
    setActiveTypes((current) =>
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type],
    )
  }, [])

  return (
    <section className={cn('flex h-full flex-col', className)} aria-label="Research sources">
      <header className="flex flex-col gap-3 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Sources</h2>
          <span className="text-xs text-muted-foreground">
            {summary.total} collected
          </span>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          <SummaryStat
            icon={Layers}
            label="Avg. Trust"
            value={`${summary.averageTrust}%`}
            tone="neutral"
          />
          <SummaryStat
            icon={ShieldCheck}
            label="Verified"
            value={String(summary.verified)}
            tone="positive"
          />
          <SummaryStat
            icon={TriangleAlert}
            label="Conflicts"
            value={String(summary.conflicting)}
            tone={summary.conflicting > 0 ? 'warning' : 'neutral'}
          />
        </dl>

        <SourceSearch value={query} onChange={setQuery} resultCount={filtered.length} />

        {availableTypes.length > 0 ? (
          <SourceFilter
            availableTypes={availableTypes}
            activeTypes={activeTypes}
            onToggleType={toggleType}
            sort={sort}
            onSortChange={setSort}
            counts={typeCounts}
          />
        ) : null}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {filtered.length === 0 ? (
          <p className="px-1 py-8 text-center text-sm text-muted-foreground">
            {sources.length === 0
              ? 'No sources collected yet. Sources appear here as Taok gathers evidence.'
              : 'No sources match your filters.'}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {visible.map((source) => (
              <li key={source.id}>
                <SourceItem
                  source={source}
                  citationCount={citationCounts?.[source.id] ?? 0}
                  active={source.id === activeSourceId}
                  onSelect={onSelectSource}
                />
              </li>
            ))}
            {hasMore ? <li ref={sentinelRef} className="h-4" aria-hidden="true" /> : null}
          </ul>
        )}
      </div>
    </section>
  )
}

interface SummaryStatProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tone: 'positive' | 'neutral' | 'warning'
}

function SummaryStat({ icon: Icon, label, value, tone }: SummaryStatProps) {
  return (
    <div className="flex flex-col gap-0.5 rounded-lg border border-border bg-card px-2.5 py-2">
      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <Icon
          className={cn(
            'size-3',
            tone === 'positive' && 'text-success',
            tone === 'warning' && 'text-warning',
          )}
          aria-hidden="true"
        />
        {label}
      </span>
      <span
        className={cn(
          'font-mono text-sm font-semibold tabular-nums text-foreground',
          tone === 'warning' && value !== '0' && 'text-warning',
        )}
      >
        {value}
      </span>
    </div>
  )
}

export const ResearchSources = React.memo(ResearchSourcesImpl)
export default ResearchSources
