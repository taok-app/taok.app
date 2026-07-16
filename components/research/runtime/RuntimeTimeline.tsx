'use client'

import React from 'react'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export interface TimelineEntry {
  id: string
  timestamp: number
  type: 'start' | 'stage_complete' | 'finding' | 'source_added' | 'analysis' | 'complete' | 'error'
  title: string
  description?: string
  metadata?: Record<string, any>
}

interface RuntimeTimelineProps {
  entries: TimelineEntry[]
  isStreaming?: boolean
}

export function RuntimeTimeline({ entries, isStreaming = false }: RuntimeTimelineProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'complete':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case 'start':
      case 'stage_complete':
      case 'finding':
      case 'source_added':
      case 'analysis':
      default:
        return <Clock className="w-5 h-5 text-blue-600" />
    }
  }

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'start':
        return 'bg-blue-50'
      case 'stage_complete':
        return 'bg-blue-50'
      case 'finding':
        return 'bg-amber-50'
      case 'source_added':
        return 'bg-green-50'
      case 'analysis':
        return 'bg-purple-50'
      case 'complete':
        return 'bg-green-50'
      case 'error':
        return 'bg-red-50'
      default:
        return 'bg-slate-50'
    }
  }

  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const elapsed = now - timestamp
    if (elapsed < 1000) return 'just now'
    if (elapsed < 60000) return `${Math.floor(elapsed / 1000)}s ago`
    return `${Math.floor(elapsed / 60000)}m ago`
  }

  return (
    <div className="space-y-3">
      {entries.length === 0 && (
        <div className="text-center py-8 text-slate-600">
          <p className="text-sm">No activity yet. Start a research to see execution timeline.</p>
        </div>
      )}

      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div key={entry.id} className="flex gap-4">
            {/* Timeline connector */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center flex-shrink-0">
                {getIconForType(entry.type)}
              </div>
              {idx < entries.length - 1 && (
                <div className="w-0.5 h-8 bg-gradient-to-b from-slate-300 to-slate-200" />
              )}
            </div>

            {/* Timeline content */}
            <div className={`flex-1 rounded-lg p-3 ${getBackgroundColor(entry.type)}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900">{entry.title}</h4>
                  {entry.description && (
                    <p className="text-xs text-slate-600 mt-1">{entry.description}</p>
                  )}
                  {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                    <div className="text-xs text-slate-600 mt-2 space-y-1">
                      {Object.entries(entry.metadata).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium">{key}:</span> {String(value)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">
                  {formatTime(entry.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isStreaming && entries.length > 0 && (
          <div className="flex gap-4 py-2">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-300 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              </div>
            </div>
            <div className="flex-1 text-sm text-slate-600 py-1">
              Research in progress...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
