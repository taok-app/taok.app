'use client'

import React, { useState } from 'react'
import { ResultsOrganizer } from '../results/ResultsOrganizer'
import { ExportPanel } from '../results/ExportPanel'
import { ResearchActionPanel } from '../results/ResearchActionPanel'
import { RuntimeTimeline, type TimelineEntry } from '../runtime/RuntimeTimeline'
import { RuntimeStageProgress, type ResearchStage } from '../runtime/RuntimeStageProgress'
import { ExecutionFeed, type ExecutionLog } from '../runtime/ExecutionFeed'
import { LivingReport } from '../report/LivingReport'

export default function ResearchInspector() {
  const [activeTab, setActiveTab] = useState<'runtime' | 'report' | 'results' | 'export' | 'actions'>('runtime')

  // Placeholder runtime data
  const mockStages: ResearchStage[] = [
    { id: 'discovery', name: 'Discovery', description: 'Finding relevant sources', order: 1 },
    { id: 'analysis', name: 'Analysis', description: 'Analyzing findings', order: 2 },
    { id: 'synthesis', name: 'Synthesis', description: 'Creating insights', order: 3 },
  ]

  const mockTimelineEntries: TimelineEntry[] = [
    {
      id: '1',
      timestamp: Date.now() - 15000,
      type: 'start',
      title: 'Research started',
      description: 'Beginning research session',
    },
    {
      id: '2',
      timestamp: Date.now() - 12000,
      type: 'finding',
      title: 'Sources discovered',
      description: 'Found 12 relevant sources',
      metadata: { sources: 12, relevance: 'high' },
    },
    {
      id: '3',
      timestamp: Date.now() - 8000,
      type: 'analysis',
      title: 'Analysis in progress',
      description: 'Processing findings for patterns',
      metadata: { processed: 8, remaining: 4 },
    },
  ]

  const mockExecutionLogs: ExecutionLog[] = [
    {
      id: '1',
      timestamp: Date.now() - 15000,
      level: 'info',
      message: 'Initialized research session',
    },
    {
      id: '2',
      timestamp: Date.now() - 12000,
      level: 'success',
      message: 'Successfully queried 12 sources',
      details: 'Query: "SaaS companies selling to mid-market"',
    },
    {
      id: '3',
      timestamp: Date.now() - 8000,
      level: 'info',
      message: 'Analyzing findings for patterns',
    },
  ]

  const tabs = [
    { id: 'runtime', label: 'Runtime', icon: '⚙️' },
    { id: 'report', label: 'Report', icon: '📄' },
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
            onClick={() => setActiveTab(tab.id as 'runtime' | 'report' | 'results' | 'export' | 'actions')}
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
          {activeTab === 'runtime' && (
            <div className="space-y-6">
              {/* Stage progress */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Research stages</h3>
                <RuntimeStageProgress
                  stages={mockStages}
                  currentStage="analysis"
                  completedStages={['discovery']}
                  isStreaming={true}
                />
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Activity timeline</h3>
                <RuntimeTimeline entries={mockTimelineEntries} isStreaming={true} />
              </div>

              {/* Execution feed */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Execution logs</h3>
                <ExecutionFeed logs={mockExecutionLogs} isStreaming={true} />
              </div>
            </div>
          )}
          {activeTab === 'report' && <LivingReport />}
          {activeTab === 'results' && <ResultsOrganizer />}
          {activeTab === 'actions' && <ResearchActionPanel />}
          {activeTab === 'export' && <ExportPanel />}
        </div>
      </div>
    </div>
  )
}
