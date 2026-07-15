'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import type { ResolvedCitation } from '@/types/citations'
import { CitationList } from '@/components/research/citations/CitationList'
import { CitationText } from './CitationText'

export interface AnswerBlock {
  id: string
  /** Optional section heading. */
  heading?: string
  /** Paragraph text with inline `[n]` citation markers. */
  text: string
}

export interface ResearchAnswerProps {
  blocks: AnswerBlock[]
  citations?: ResolvedCitation[]
  /** Whether the answer is still streaming (renders a caret + status). */
  streaming?: boolean
  /** Show the evidence (citation cards) list beneath the prose. */
  showEvidence?: boolean
  className?: string
}

/**
 * The primary research answer surface. Prose blocks render inline citation
 * badges, and an evidence list backs every claim below the answer — enforcing
 * Taok's evidence-first principle.
 */
function ResearchAnswerImpl({
  blocks,
  citations,
  streaming = false,
  showEvidence = true,
  className,
}: ResearchAnswerProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className="flex flex-col gap-4">
        {blocks.map((block, index) => (
          <section key={block.id} className="flex flex-col gap-1.5">
            {block.heading ? (
              <h3 className="text-sm font-semibold text-foreground">{block.heading}</h3>
            ) : null}
            <p className="text-sm leading-relaxed text-foreground text-pretty">
              <CitationText text={block.text} citations={citations} />
              {streaming && index === blocks.length - 1 ? (
                <span
                  className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-foreground align-middle"
                  aria-hidden="true"
                />
              ) : null}
            </p>
          </section>
        ))}
      </div>

      {showEvidence ? (
        <div className="flex flex-col gap-2.5 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Evidence
            </h4>
            {streaming ? (
              <span className="text-[11px] text-muted-foreground" role="status" aria-live="polite">
                Collecting evidence…
              </span>
            ) : null}
          </div>
          <CitationList citations={citations} />
        </div>
      ) : null}
    </div>
  )
}

export const ResearchAnswer = React.memo(ResearchAnswerImpl)
export default ResearchAnswer
