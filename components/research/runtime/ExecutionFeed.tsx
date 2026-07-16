'use client'

import React from 'react'

export interface ExecutionLog {
  id: string
  timestamp: number
  level: 'info' | 'success' | 'warning' | 'error'
  message: string
  details?: string
}

interface ExecutionFeedProps {
  logs: ExecutionLog[]
  isStreaming?: boolean
}

export function ExecutionFeed({ logs, isStreaming = false }: ExecutionFeedProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'warning':
        return 'text-amber-700 bg-amber-50 border-amber-200'
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200'
      case 'info':
      default:
        return 'text-blue-700 bg-blue-50 border-blue-200'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success':
        return '✓'
      case 'warning':
        return '⚠'
      case 'error':
        return '✕'
      case 'info':
      default:
        return 'ℹ'
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <div className="space-y-2 text-sm font-mono">
      {logs.length === 0 && (
        <div className="text-center py-8 text-slate-600">
          <p className="text-sm">No execution logs yet.</p>
        </div>
      )}

      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`rounded-lg border p-3 transition-all ${getLevelColor(log.level)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg font-bold flex-shrink-0 w-5 text-center">
                {getLevelIcon(log.level)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs opacity-75">[{formatTime(log.timestamp)}]</span>
                  <span className="break-words">{log.message}</span>
                </div>
                {log.details && (
                  <div className="text-xs opacity-75 mt-1 pl-6 whitespace-pre-wrap break-words">
                    {log.details}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isStreaming && logs.length > 0 && (
          <div className="text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <span className="inline-block animate-pulse">● </span>
            Awaiting next execution step...
          </div>
        )}
      </div>
    </div>
  )
}
