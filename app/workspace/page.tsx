import React from 'react'
import { ResearchHomeHero } from '@/components/dashboard/ResearchHomeHero'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RecentResearch } from '@/components/dashboard/RecentResearch'
import { ResearchActivityFeed } from '@/components/dashboard/ResearchActivityFeed'
import { KnowledgeEntryPoints } from '@/components/dashboard/KnowledgeEntryPoints'

export const metadata = {
  title: 'Dashboard - Taok Workspace',
  description: 'Your TAOK workspace dashboard',
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="px-6 lg:px-8 py-8 lg:py-10">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero section */}
            <ResearchHomeHero />

            {/* Quick actions */}
            <QuickActions />

            {/* Two column layout for research activity and knowledge */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left column - Research activity and recent sessions */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent research */}
                <RecentResearch />

                {/* Activity feed */}
                <ResearchActivityFeed />
              </div>

              {/* Right column - Knowledge entry points */}
              <div className="space-y-8">
                <KnowledgeEntryPoints />

                {/* Onboarding tip card */}
                <div className="rounded-lg border border-border bg-slate-50 p-6 sticky top-8">
                  <h4 className="font-semibold text-sm text-foreground mb-2">Get started</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Start your first research to discover companies, track decision makers, and unlock buying signals with AI.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li>• Add companies to track</li>
                    <li>• Find decision makers</li>
                    <li>• Export reports</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
