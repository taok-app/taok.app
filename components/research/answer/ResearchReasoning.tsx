'use client'

import React from 'react'
import { ChevronDown, BrainCircuit } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ResolvedCitation } from '@/types/citations'
import { CitationText } from './CitationText'

export interface ReasoningStep {
  id: string
  /** Short label for the reasoning step. */
  label: string
  /** Detailed reasoning text with inline `[n]` citation markers. */
  detail: string
}

export interface ResearchReasoningProps {
  steps: ReasoningStep[]
  citations?: ResolvedCitation[]
  /** Whether the panel starts expanded. */
  defaultOpen?: boolean
  streaming?: boolean
  className?: string
}

/**
 * Collapsible chain-of-reasoning panel. Each step can cite evidence inline, so
 * users can audit *why* Taok reached a conclusion, not just the conclusion.
 */
function ResearchReasoningImpl({
  steps,
  citations,
  defaultOpen = false,
  streaming = false,
  className,
}: ResearchReasoningProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const regionId = React.useId()

  return (
    <div className={cn('rounded-lg border border-border bg-card', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={regionId}
        className="flex w-full items-center justify-between gap-2 rounded-lg px-3.5 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <BrainCircuit className="size-4 text-muted-foreground" aria-hidden="true" />
          Reasoning
          <span className="font-mono text-xs text-muted-foreground">{steps.length}</span>
          {streaming ? (
            <span className="text-[11px] font-normal text-muted-foreground">thinking…</span>
          ) : null}
        </span>
        <ChevronDown
          className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ol id={regionId} className="flex flex-col gap-3 border-t border-border px-3.5 py-3">
          {steps.map((step, index) => (
            <li key={step.id} className="flex gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[11px] font-semibold text-muted-foreground">
                {index + 1}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="text-xs font-medium text-foreground">{step.label}</p>
                <p className="text-xs leading-relaxed text-muted-foreground text-pretty">
                  <CitationText text={step.detail} citations={citations} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}

export const ResearchReasoning = React.memo(ResearchReasoningImpl)
export default ResearchReasoning
