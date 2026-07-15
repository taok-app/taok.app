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
      <div className="border-b border-border px-6 lg:px-8 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Welcome to your Taok workspace. Sign in to see your companies, people, and research sessions.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="rounded-lg border border-border bg-card p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Companies</p>
                    <p className="text-3xl font-bold text-foreground mt-2">—</p>
                    <p className="text-xs text-slate-500 mt-2">in your workspace</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">People</p>
                    <p className="text-3xl font-bold text-foreground mt-2">—</p>
                    <p className="text-xs text-slate-500 mt-2">decision makers tracked</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Research Sessions</p>
                    <p className="text-3xl font-bold text-foreground mt-2">—</p>
                    <p className="text-xs text-slate-500 mt-2">research projects</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty state */}
            <div className="rounded-lg border border-border bg-card p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-slate-100 p-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
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
                  <h3 className="text-lg font-semibold text-foreground">Get started with Taok</h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                    Sign in to your account to access your workspace and begin researching companies.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button asChild>
                    <a href="/research" className="inline-flex items-center gap-2">
                      Try Research Workspace
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/">Back to home</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick onboarding tips */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Quick start</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-medium text-foreground text-sm">Add companies</h3>
                  <p className="text-xs text-slate-600 mt-1">Search and add companies to track in your workspace</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-medium text-foreground text-sm">Research insights</h3>
                  <p className="text-xs text-slate-600 mt-1">Use AI-powered research to discover decision makers</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-medium text-foreground text-sm">Track people</h3>
                  <p className="text-xs text-slate-600 mt-1">Monitor key executives and their career movements</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-medium text-foreground text-sm">Export data</h3>
                  <p className="text-xs text-slate-600 mt-1">Save and export your research for use in your outreach</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
