import React, { Suspense } from 'react'
import { ChevronRight } from 'lucide-react'
import ResearchSidebar from '../sidebar/ResearchSidebar'
import ResearchCanvas from '../canvas/ResearchCanvas'
import ResearchInspector from '../inspector/ResearchInspector'

export default function ResearchLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <header className="border-b bg-white px-4 py-4">
        <div className="max-w-[1600px] mx-auto space-y-3">
          {/* Top navigation */}
          <div className="flex items-center justify-between">
            <a href="/" className="text-lg font-semibold hover:opacity-80 transition-opacity">Taok Research</a>
            <nav aria-label="Research navigation" className="flex items-center gap-6 text-sm">
              <a href="/research" className="font-medium text-slate-900">Workspace</a>
              <a href="/research/citations" className="text-slate-600 hover:text-slate-900">Citations</a>
              <a href="/workspace" className="text-slate-600 hover:text-slate-900">Dashboard</a>
            </nav>
          </div>

          {/* Breadcrumbs and session info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <a href="/workspace" className="hover:text-slate-900">Dashboard</a>
              <ChevronRight className="w-4 h-4" />
              <a href="/research" className="hover:text-slate-900">Research</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 font-medium">Active Session</span>
            </div>
            <div className="text-xs text-slate-600">
              Session started at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="max-w-[1600px] mx-auto min-h-full lg:h-full grid grid-cols-12 gap-4 p-3 sm:p-4">
          <aside className="col-span-12 lg:col-span-3 h-auto lg:h-[calc(100vh-96px)] overflow-auto rounded-md border bg-slate-50">
            <ResearchSidebar />
          </aside>

          <section className="col-span-12 lg:col-span-9 xl:col-span-6 min-h-[60vh] lg:h-[calc(100vh-96px)] overflow-auto rounded-md border bg-white">
            <Suspense fallback={<div className="p-6">Loading canvas…</div>}>
              <ResearchCanvas />
            </Suspense>
          </section>

          <aside className="col-span-3 hidden xl:block h-[calc(100vh-96px)] overflow-auto rounded-md border bg-slate-50">
            <ResearchInspector />
          </aside>
        </div>
      </main>

      <footer className="border-t p-2 text-xs text-slate-500">&copy; Taok</footer>
    </div>
  )
}
