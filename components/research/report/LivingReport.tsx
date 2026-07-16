'use client'

import React from 'react'
import { ExecutiveSummary, KeyFindings, CompaniesSection, PeopleSection, SourcesSection } from './ReportSections'
import { FollowUpConversation } from './FollowUpConversation'
import { SuggestedActions } from './SuggestedActions'

export function LivingReport() {
  return (
    <div className="space-y-8">
      {/* Report Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Research Report</h1>
            <p className="text-sm text-slate-600 mt-1">
              Find SaaS companies that sell to mid-market manufacturers
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-600">Generated today at 2:34 PM</p>
            <p className="text-xs text-slate-500 mt-1">Research ID: #RES-2024-001</p>
          </div>
        </div>
      </div>

      {/* Main Report Sections */}
      <ExecutiveSummary />
      <KeyFindings />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CompaniesSection />
        <PeopleSection />
      </div>

      <SourcesSection />

      {/* Suggested Actions */}
      <SuggestedActions />

      {/* Follow-up Conversation */}
      <FollowUpConversation />

      {/* Report Footer */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
        <p>
          This report is a living document. Ask follow-up questions to refine your research or generate a final PDF export.
        </p>
      </div>
    </div>
  )
}
