'use client'

import React, { useState } from 'react'
import { useResearchStreamWithCitations } from '@/hooks/useResearchStreamWithCitations'
import { CitationProvider } from '@/components/research/citations/CitationContext'
import { CitationDrawer } from '@/components/research/citations/CitationDrawer'
import MessageList from './MessageList'
import PromptComposer from './PromptComposer'
import { ResearchAnswer } from '../answer/ResearchAnswer'
import { ResearchReasoning } from '../answer/ResearchReasoning'
import { ResearchTimeline } from '../answer/ResearchTimeline'
import { ResearchSources } from '../sources/ResearchSources'
import { ShieldCheck } from 'lucide-react'

export interface ResearchCanvasLiveProps {
  /** Optional session ID or research ID for fetching live stream. */
  sessionId?: string
}

/**
 * Live research canvas that integrates streaming research execution with
 * real-time citation updates. Citations appear inline as they're generated.
 */
export function ResearchCanvasLive({ sessionId }: ResearchCanvasLiveProps) {
  const [messages, setMessages] = useState<Array<{ id: string; role: 'user' | 'assistant'; text: string }>>([])
  const [activeSourceId, setActiveSourceId] = useState<string | undefined>(undefined)

  // Construct stream endpoint based on session ID
  const endpoint = sessionId ? `/api/research/${sessionId}/stream` : null

  // Connect to research stream with integrated citations
  const {
    status,
    answerBlocks,
    reasoningSteps,
    timelineEntries,
    completed,
    error,
    citations,
    sources,
    citationCounts,
    abort,
  } = useResearchStreamWithCitations(endpoint)

  const streaming = status.stage !== 'Completed' && !completed

  // Handle user prompt submission
  const handlePromptSubmit = (text: string) => {
    const id = String(Date.now())
    setMessages((m) => [
      ...m,
      { id, role: 'user', text },
      { id: id + '-a', role: 'assistant', text: 'Working on it…' },
    ])

    // In a real implementation, this would POST to create a new research session
    // and set the sessionId, which would trigger the stream connection.
    // For now, we'll leave this as a stub.
  }

  return (
    <CitationProvider citations={citations}>
      <div className="flex flex-col h-full bg-white">
        {/* Header with status */}
        <div className="p-4 border-b bg-white/60 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                <h2 className="text-sm font-semibold">Research Canvas</h2>
                <p className="text-xs text-muted-foreground">
                  {streaming ? `Researching… ${Math.round(status.progress * 100)}%` : 'Ready'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {streaming && (
                <button
                  type="button"
                  onClick={abort}
                  className="px-2 py-1 rounded border border-border hover:bg-accent"
                >
                  Stop
                </button>
              )}
              {citations.length > 0 && (
                <span>
                  {citations.length} claims · {sources.length} sources
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] h-full gap-0">
            {/* Canvas section */}
            <div className="overflow-auto flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-auto p-4">
                <MessageList messages={messages} />
              </div>

              {/* Answer, reasoning, timeline */}
              {answerBlocks.length > 0 && (
                <div className="flex-1 overflow-auto px-4 py-6 space-y-6">
                  <ResearchAnswer
                    blocks={answerBlocks}
                    citations={citations}
                    streaming={streaming}
                  />

                  {reasoningSteps.length > 0 && (
                    <ResearchReasoning steps={reasoningSteps} citations={citations} />
                  )}

                  {timelineEntries.length > 0 && (
                    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
                      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Research timeline
                      </h4>
                      <ResearchTimeline
                        entries={timelineEntries}
                        citations={citations}
                        streaming={streaming}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Error display */}
              {error && (
                <div className="p-4 border-t bg-destructive/10 text-destructive text-sm">
                  <p>Error: {error}</p>
                </div>
              )}

              {/* Prompt composer */}
              <div className="p-4 border-t bg-white">
                <PromptComposer onSubmit={handlePromptSubmit} />
              </div>
            </div>

            {/* Sources sidebar */}
            <div className="hidden lg:block border-l overflow-auto bg-card">
              <ResearchSources
                sources={sources}
                citationCounts={citationCounts}
                activeSourceId={activeSourceId}
                onSelectSource={(s) => setActiveSourceId(s.id)}
              />
            </div>
          </div>
        </div>

        {/* Citation drawer */}
        <CitationDrawer />
      </div>
    </CitationProvider>
  )
}

export default ResearchCanvasLive
