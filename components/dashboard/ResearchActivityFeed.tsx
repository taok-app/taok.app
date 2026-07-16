'use client'

import React from 'react'
import { CheckCircle2, Quote, FileText, Zap } from 'lucide-react'

interface ActivityItem {
  id: string
  type: 'completed' | 'citation' | 'export' | 'ai'
  title: string
  description: string
  time: string
}

// Placeholder data - can be connected to real activity log when implemented
const placeholderActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'completed',
    title: 'Research completed',
    description: 'Enterprise SaaS Companies research finished with 42 companies found',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'citation',
    title: 'Citation added',
    description: 'New source discovered for Fintech decision makers',
    time: '5 hours ago',
  },
  {
    id: '3',
    type: 'export',
    title: 'Report exported',
    description: 'AI Infrastructure Leaders report downloaded',
    time: '1 day ago',
  },
  {
    id: '4',
    type: 'ai',
    title: 'AI follow-up',
    description: 'Generated follow-up questions for Enterprise SaaS review',
    time: '2 days ago',
  },
]

function getActivityIcon(type: string) {
  switch (type) {
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-600" />
    case 'citation':
      return <Quote className="h-4 w-4 text-blue-600" />
    case 'export':
      return <FileText className="h-4 w-4 text-purple-600" />
    case 'ai':
      return <Zap className="h-4 w-4 text-amber-600" />
    default:
      return <div className="h-4 w-4" />
  }
}

export function ResearchActivityFeed() {
  const activity = placeholderActivity

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">Research activity</h3>
        <p className="text-sm text-slate-600 mt-1">AI-powered research and system events</p>
      </div>

      {activity.length > 0 ? (
        <div className="space-y-3">
          {activity.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-border bg-card p-4 hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">{getActivityIcon(item.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                    <span className="text-xs text-slate-500 flex-shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-600">
            Activity will appear as you research, export, and discover insights.
          </p>
        </div>
      )}
    </div>
  )
}
