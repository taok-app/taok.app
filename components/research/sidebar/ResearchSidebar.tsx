'use client'

import React from 'react'
import { BookOpen, BarChart3, Share2, Zap, HelpCircle } from 'lucide-react'

export default function ResearchSidebar() {
  const researchTemplates = [
    { icon: '🏢', label: 'Find companies in a market', category: 'Discovery' },
    { icon: '👥', label: 'Identify decision makers', category: 'People' },
    { icon: '📈', label: 'Analyze market trends', category: 'Insights' },
    { icon: '🎯', label: 'Research competitors', category: 'Competitive' },
  ]

  const quickActions = [
    { icon: BookOpen, label: 'Citation workspace', href: '/research/citations', color: 'text-blue-600' },
    { icon: Share2, label: 'Export research', href: '#', color: 'text-purple-600', disabled: true },
    { icon: BarChart3, label: 'View reports', href: '#', color: 'text-green-600', disabled: true },
    { icon: Zap, label: 'AI follow-up', href: '#', color: 'text-orange-600', disabled: true },
  ]

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Research templates */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Research templates</h3>
        <div className="space-y-2">
          {researchTemplates.map((t, idx) => (
            <button
              key={idx}
              className="w-full text-left px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm group"
              title={t.category}
            >
              <span className="text-base mr-2">{t.icon}</span>
              <span className="text-slate-700 group-hover:text-slate-900 font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Quick actions</h3>
        <div className="space-y-2">
          {quickActions.map((action, idx) => {
            const Icon = action.icon
            return (
              <a
                key={idx}
                href={action.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm transition-all ${
                  action.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-slate-300 hover:bg-slate-50'
                }`}
                onClick={(e) => action.disabled && e.preventDefault()}
              >
                <Icon className={`w-4 h-4 ${action.color}`} />
                <span className="text-slate-700 font-medium flex-1">{action.label}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Runtime status section - shown when research is active */}
      <div className="p-4 border-b border-slate-200 bg-blue-50">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Session status</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Status:</span>
            <span className="inline-flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Active
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Elapsed:</span>
            <span className="font-medium text-slate-900">2m 34s</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Sources:</span>
            <span className="font-medium text-slate-900">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Findings:</span>
            <span className="font-medium text-slate-900">8</span>
          </div>
        </div>
      </div>

      {/* Help section */}
      <div className="flex-1" />
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-slate-600" />
          <h3 className="text-xs font-semibold text-slate-900">Getting started</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          Enter a research query to discover companies, analyze markets, or research competitors with AI.
        </p>
        <a href="/" className="text-xs font-medium text-blue-600 hover:text-blue-700">
          Back to home →
        </a>
      </div>
    </div>
  )
}
