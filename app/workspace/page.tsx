import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Dashboard - Taok Workspace',
  description: 'Your TAOK workspace dashboard',
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-border bg-gradient-to-r from-white to-slate-50 px-6 lg:px-8 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-slate-600 max-w-2xl leading-relaxed">
              Welcome to your Taok workspace. Sign in to see your companies, people, and research sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Companies</p>
                    <p className="text-4xl font-bold text-foreground mt-3">—</p>
                    <p className="text-xs text-slate-500 mt-3 font-medium">in your workspace</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">People</p>
                    <p className="text-4xl font-bold text-foreground mt-3">—</p>
                    <p className="text-xs text-slate-500 mt-3 font-medium">decision makers tracked</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Research Sessions</p>
                    <p className="text-4xl font-bold text-foreground mt-3">—</p>
                    <p className="text-xs text-slate-500 mt-3 font-medium">research projects</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty state */}
            <div className="rounded-lg border border-border bg-gradient-to-br from-card to-slate-50 p-12 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="rounded-full bg-slate-100 p-5 ring-1 ring-slate-200">
                  <svg
                    className="w-8 h-8 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">Get started with Taok</h3>
                  <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                    Sign in to your account to access your workspace and begin researching companies.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Button asChild className="transition-all duration-200 hover:shadow-md">
                    <a href="/research" className="inline-flex items-center gap-2">
                      Try Research Workspace
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="transition-all duration-200">
                    <a href="/">Back to home</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick onboarding tips */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Quick start</h2>
                <p className="text-sm text-slate-600 mt-1">Learn how to make the most of Taok</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-card p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-default">
                  <h3 className="font-semibold text-foreground text-sm">Add companies</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">Search and add companies to track in your workspace</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-default">
                  <h3 className="font-semibold text-foreground text-sm">Research insights</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">Use AI-powered research to discover decision makers</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-default">
                  <h3 className="font-semibold text-foreground text-sm">Track people</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">Monitor key executives and their career movements</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-default">
                  <h3 className="font-semibold text-foreground text-sm">Export data</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">Save and export your research for use in your outreach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
