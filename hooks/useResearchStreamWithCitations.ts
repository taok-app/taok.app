'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { CitationStreamEvent } from '@/types/citations'
import type {
  AnswerDeltaEvent,
  ReasoningDeltaEvent,
  ResearchCompletedEvent,
  ResearchProgressEvent,
  ResearchStreamEventExtended,
  TimelineEntryEvent,
} from '@/types/stream'
import { isResearchStreamEvent } from '@/types/stream'
import { isCitationStreamEvent } from '@/packages/research/citations'
import type { ResearchStreamStatus } from '@/types/research'
import { useCitationStream } from './useCitationStream'

export interface ResearchStreamWithCitationsResult {
  // Research state
  status: ResearchStreamStatus
  answerBlocks: AnswerDeltaEvent[]
  reasoningSteps: ReasoningDeltaEvent[]
  timelineEntries: TimelineEntryEvent[]
  completed: boolean
  error?: string

  // Citation state (from useCitationStream)
  citations: ReturnType<typeof useCitationStream>['citations']
  sources: ReturnType<typeof useCitationStream>['sources']
  citationCounts: ReturnType<typeof useCitationStream>['citationCounts']

  // Control
  abort: () => void
}

/**
 * Unified streaming hook that:
 * 1. Connects to the research stream endpoint
 * 2. Parses research events (progress, reasoning, answer, timeline)
 * 3. Passes citation events to useCitationStream
 * 4. Accumulates all state for incremental rendering
 *
 * This is the primary integration point for connecting live research to citations.
 */
export function useResearchStreamWithCitations(
  endpoint: string | null,
): ResearchStreamWithCitationsResult {
  // Research state
  const [status, setStatus] = useState<ResearchStreamStatus>({ stage: 'Planning', progress: 0 })
  const [answerBlocks, setAnswerBlocks] = useState<AnswerDeltaEvent[]>([])
  const [reasoningSteps, setReasoningSteps] = useState<ReasoningDeltaEvent[]>([])
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntryEvent[]>([])
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState<string | undefined>()

  // Citation state
  const citationStream = useCitationStream()

  // Connection control
  const controllerRef = useRef<AbortController | null>(null)
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null)
  const cancelledRef = useRef(false)

  const abort = useCallback(() => {
    cancelledRef.current = true
    controllerRef.current?.abort()
    readerRef.current?.cancel().catch(() => {})
  }, [])

  useEffect(() => {
    if (!endpoint) {
      setStatus({ stage: 'Planning', progress: 0 })
      setCompleted(false)
      return
    }

    controllerRef.current = new AbortController()
    cancelledRef.current = false
    const signal = controllerRef.current.signal

    async function connect() {
      try {
        const res = await fetch(endpoint, { signal })
        if (!res.body) {
          throw new Error('No response body')
        }

        readerRef.current = res.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await readerRef.current.read()
          if (done || cancelledRef.current) break

          const chunk = decoder.decode(value)

          // Parse newline-delimited JSON events
          chunk.split('\n').forEach((line) => {
            if (!line.trim()) return

            try {
              const event = JSON.parse(line) as unknown

              if (!isResearchStreamEvent(event)) return

              // Handle citation events
              if (isCitationStreamEvent(event)) {
                citationStream.applyUnknown(event)
                return
              }

              // Handle research events
              switch (event.type) {
                case 'research_progress': {
                  const progressEvent = event as ResearchProgressEvent
                  setStatus({ stage: progressEvent.stage, progress: progressEvent.progress })
                  break
                }
                case 'answer_delta': {
                  const answerEvent = event as AnswerDeltaEvent
                  setAnswerBlocks((prev) => {
                    // Upsert: update if exists, append otherwise
                    const existing = prev.findIndex((b) => b.id === answerEvent.id)
                    if (existing >= 0) {
                      const updated = [...prev]
                      updated[existing] = answerEvent
                      return updated
                    }
                    return [...prev, answerEvent]
                  })
                  break
                }
                case 'reasoning_delta': {
                  const reasoningEvent = event as ReasoningDeltaEvent
                  setReasoningSteps((prev) => {
                    const existing = prev.findIndex((r) => r.id === reasoningEvent.id)
                    if (existing >= 0) {
                      const updated = [...prev]
                      updated[existing] = reasoningEvent
                      return updated
                    }
                    return [...prev, reasoningEvent]
                  })
                  break
                }
                case 'timeline_entry': {
                  const timelineEvent = event as TimelineEntryEvent
                  setTimelineEntries((prev) => {
                    const existing = prev.findIndex((t) => t.id === timelineEvent.id)
                    if (existing >= 0) {
                      const updated = [...prev]
                      updated[existing] = timelineEvent
                      return updated
                    }
                    return [...prev, timelineEvent]
                  })
                  break
                }
                case 'research_completed': {
                  const completedEvent = event as ResearchCompletedEvent
                  setCompleted(true)
                  if (!completedEvent.success && completedEvent.error) {
                    setError(completedEvent.error)
                  }
                  break
                }
              }
            } catch (e) {
              // Ignore non-JSON or malformed events
              console.warn('Failed to parse event', line, e)
            }
          })
        }

        if (!cancelledRef.current) {
          setStatus((prev) => ({ ...prev, stage: 'Completed', progress: 1 }))
          setCompleted(true)
        }
      } catch (e) {
        if (cancelledRef.current) return
        const err = e instanceof Error ? e.message : 'Unknown error'
        setError(err)
        setStatus((prev) => ({ ...prev, stage: 'Completed' }))
        setCompleted(true)
      }
    }

    connect()

    return () => {
      cancelledRef.current = true
      controllerRef.current?.abort()
      readerRef.current?.cancel().catch(() => {})
    }
  }, [endpoint, citationStream])

  return {
    status,
    answerBlocks,
    reasoningSteps,
    timelineEntries,
    completed,
    error,
    citations: citationStream.citations,
    sources: citationStream.sources,
    citationCounts: citationStream.citationCounts,
    abort,
  }
}
