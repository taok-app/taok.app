'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

interface ResearchHomeHeroProps {
  onStartResearch?: () => void
}

export function ResearchHomeHero({ onStartResearch }: ResearchHomeHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-slate-50 via-white to-slate-50 p-8 lg:p-10">
      {/* Subtle background accent */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 via-transparent to-slate-100/50" />
      </div>

      <div className="relative space-y-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-900 p-2">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground">Welcome back</h2>
        </div>

        <div className="space-y-2">
          <p className="text-base text-slate-700 font-medium">
            Discover companies, track decision makers, and unlock buying signals with AI research.
          </p>
          <p className="text-sm text-slate-600">
            Start your research to move faster from discovery to execution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            asChild
            className="transition-all duration-200 hover:shadow-md"
          >
            <a href="/research" className="inline-flex items-center gap-2">
              Start new research
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="transition-all duration-200"
          >
            <a href="/research/citations">
              View citations
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
