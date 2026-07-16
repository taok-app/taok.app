'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Clock, ArrowRight } from 'lucide-react'

interface ResearchSession {
  id: string
  title: string
  status: 'completed' | 'in-progress' | 'paused'
  updated: string
  progress: number
}

// Placeholder data structure - can be replaced with real data when session management is implemented
const placeholderSessions: ResearchSession[] = [
  {
    id: '1',
    title: 'Enterprise SaaS Companies',
    status: 'completed',
    updated: '2 hours ago',
    progress: 100,
  },
  {
    id: '2',
    title: 'Fintech Decision Makers',
    status: 'completed',
    updated: '1 day ago',
    progress: 100,
  },
  {
    id: '3',
    title: 'AI Infrastructure Leaders',
    status: 'paused',
    updated: '3 days ago',
    progress: 60,
  },
]

export function RecentResearch() {
  const sessions = placeholderSessions

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">Recent research</h3>
        <p className="text-sm text-slate-600 mt-1">Continue or review your research sessions</p>
      </div>

      {sessions.length > 0 ? (
        <div className="space-y-2">
          {sessions.map((session) => (
            <Button
              key={session.id}
              asChild
              variant="outline"
              className="w-full h-auto justify-between p-4 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 group"
            >
              <a href="/research" className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 text-left">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm text-foreground truncate">{session.title}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                      <Clock className="h-3 w-3 flex-shrink-0" />
                      <span>{session.updated}</span>
                      {session.progress < 100 && (
                        <>
                          <span>•</span>
                          <span>{session.progress}% complete</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 flex-shrink-0 ml-3" />
              </a>
            </Button>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-600">
            No recent research. Start your first research to see sessions here.
          </p>
          <Button asChild className="mt-4">
            <a href="/research">Start research</a>
          </Button>
        </div>
      )}
    </div>
  )
}
