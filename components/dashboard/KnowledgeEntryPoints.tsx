'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, Database, Award, Share2 } from 'lucide-react'

interface EntryPoint {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
}

const entryPoints: EntryPoint[] = [
  {
    id: 'knowledge',
    label: 'Knowledge',
    description: 'Your research archive',
    icon: <BookOpen className="h-5 w-5" />,
    href: '/research/citations',
    color: 'text-blue-600',
  },
  {
    id: 'reports',
    label: 'Reports',
    description: 'Export and analysis',
    icon: <Database className="h-5 w-5" />,
    href: '/research',
    color: 'text-purple-600',
  },
  {
    id: 'saved',
    label: 'Saved research',
    description: 'Pinned sessions',
    icon: <Award className="h-5 w-5" />,
    href: '/research',
    color: 'text-amber-600',
  },
  {
    id: 'citations',
    label: 'Citations',
    description: 'Claims and sources',
    icon: <Share2 className="h-5 w-5" />,
    href: '/research/citations',
    color: 'text-green-600',
  },
]

export function KnowledgeEntryPoints() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">Knowledge</h3>
        <p className="text-sm text-slate-600 mt-1">Access your research data and insights</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {entryPoints.map((point) => (
          <Button
            key={point.id}
            asChild
            variant="outline"
            className="h-auto flex-col items-start justify-start p-4 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300"
          >
            <a href={point.href} className="w-full space-y-3">
              <div className={point.color}>{point.icon}</div>
              <div className="text-left">
                <div className="font-medium text-sm text-foreground">{point.label}</div>
                <div className="text-xs text-slate-600">{point.description}</div>
              </div>
            </a>
          </Button>
        ))}
      </div>
    </div>
  )
}
