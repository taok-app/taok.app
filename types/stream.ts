import type { AnswerBlock } from '@/components/research/answer/ResearchAnswer'
import type { ReasoningStep } from '@/components/research/answer/ResearchReasoning'
import type { ResearchTimelineEntry } from '@/components/research/answer/ResearchTimeline'
import type { CitationStreamEvent } from '@/types/citations'
import type { StreamStage } from '@/types/research'

export interface ResearchProgressEvent {
  type: 'research_progress'
  stage: StreamStage
  progress: number
}

export interface AnswerDeltaEvent extends AnswerBlock {
  type: 'answer_delta'
}

export interface ReasoningDeltaEvent extends ReasoningStep {
  type: 'reasoning_delta'
}

export interface TimelineEntryEvent extends ResearchTimelineEntry {
  type: 'timeline_entry'
}

export interface ResearchCompletedEvent {
  type: 'research_completed'
  success: boolean
  error?: string
}

export type ResearchStreamEvent =
  | ResearchProgressEvent
  | AnswerDeltaEvent
  | ReasoningDeltaEvent
  | TimelineEntryEvent
  | ResearchCompletedEvent

export type ResearchStreamEventExtended = ResearchStreamEvent | CitationStreamEvent

const STREAM_STAGES: ReadonlySet<StreamStage> = new Set([
  'Planning',
  'Searching',
  'Reading',
  'Extracting',
  'Reasoning',
  'Ranking',
  'Writing',
  'Completed',
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isOptionalString(value: unknown): value is string | undefined {
  return value === undefined || typeof value === 'string'
}

export function isResearchStreamEvent(value: unknown): value is ResearchStreamEventExtended {
  if (!isRecord(value)) return false

  switch (value.type) {
    case 'research_progress':
      return (
        typeof value.stage === 'string' &&
        STREAM_STAGES.has(value.stage as StreamStage) &&
        typeof value.progress === 'number' &&
        Number.isFinite(value.progress)
      )
    case 'answer_delta':
      return (
        typeof value.id === 'string' &&
        isOptionalString(value.heading) &&
        typeof value.text === 'string'
      )
    case 'reasoning_delta':
      return (
        typeof value.id === 'string' &&
        typeof value.label === 'string' &&
        typeof value.detail === 'string'
      )
    case 'timeline_entry':
      return (
        typeof value.id === 'string' &&
        typeof value.at === 'string' &&
        typeof value.title === 'string' &&
        isOptionalString(value.detail) &&
        (value.kind === undefined ||
          value.kind === 'info' ||
          value.kind === 'evidence' ||
          value.kind === 'milestone')
      )
    case 'research_completed':
      return typeof value.success === 'boolean' && isOptionalString(value.error)
    case 'source_found':
      return isRecord(value.source)
    case 'citation_added':
      return isRecord(value.citation)
    case 'verification_completed':
      return typeof value.citationId === 'string' && typeof value.verification === 'string'
    default:
      return false
  }
}
