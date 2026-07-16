'use client'

import React, { useState } from 'react'
import { ResultsOrganizer } from '../results/ResultsOrganizer'
import { ExportPanel } from '../results/ExportPanel'
import { ResearchActionPanel } from '../results/ResearchActionPanel'

export default function ResearchInspector() {
  const [activeTab, setActiveTab] = useState<'results' | 'export' | 'actions'>('results')

  const tabs = [
    { id: 'results', label: 'Results', icon: '📊' },
    { id: 'actions', label: 'Actions', icon: '⚡' },
    { id: 'export', label: 'Export', icon: '📥' },
  ]

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200">
      {/* Tab navigation */}
      <div className="flex border-b border-slate-200 bg-white overflow-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'results' | 'export' | 'actions')}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {activeTab === 'results' && <ResultsOrganizer />}
          {activeTab === 'actions' && <ResearchActionPanel />}
          {activeTab === 'export' && <ExportPanel />}
        </div>
      </div>
    </div>
  )
}
