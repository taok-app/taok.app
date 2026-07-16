'use client'

import React from 'react'
import { FileDown, Share2, Bookmark, RefreshCw, MessageSquare } from 'lucide-react'

export function SuggestedActions() {
  const actions = [
    {
      icon: FileDown,
      label: 'Export Report',
      description: 'Download as PDF with all findings',
      action: 'export',
      color: 'text-blue-600',
    },
    {
      icon: Bookmark,
      label: 'Save Research',
      description: 'Save to your workspace for later',
      action: 'save',
      color: 'text-purple-600',
    },
    {
      icon: Share2,
      label: 'Share',
      description: 'Share report with your team',
      action: 'share',
      color: 'text-green-600',
    },
    {
      icon: RefreshCw,
      label: 'Refine Research',
      description: 'Adjust criteria and rerun',
      action: 'refine',
      color: 'text-orange-600',
    },
    {
      icon: MessageSquare,
      label: 'Get Insights',
      description: 'Ask AI for deeper analysis',
      action: 'insights',
      color: 'text-pink-600',
    },
  ]

  const handleAction = (action: string) => {
    console.log('[v0] Action triggered:', action)
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Next Steps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {actions.map((action, idx) => {
          const Icon = action.icon
          return (
            <button
              key={idx}
              onClick={() => handleAction(action.action)}
              className="flex flex-col items-start gap-2 p-4 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
            >
              <Icon className={`w-5 h-5 ${action.color}`} />
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-slate-900">{action.label}</p>
                <p className="text-xs text-slate-600 mt-0.5">{action.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
