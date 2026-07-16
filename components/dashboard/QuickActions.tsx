'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Search,
  Users,
  BookOpen,
  Upload,
  BarChart3,
  Zap,
} from 'lucide-react'

interface QuickAction {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  href: string
}

const actions: QuickAction[] = [
  {
    id: 'research',
    label: 'New research',
    description: 'Discover companies and people',
    icon: <Search className="h-5 w-5" />,
    href: '/research',
  },
  {
    id: 'companies',
    label: 'Explore companies',
    description: 'Add and track organizations',
    icon: <BarChart3 className="h-5 w-5" />,
    href: '/research',
  },
  {
    id: 'people',
    label: 'Explore people',
    description: 'Find decision makers',
    icon: <Users className="h-5 w-5" />,
    href: '/research',
  },
  {
    id: 'knowledge',
    label: 'Open knowledge',
    description: 'Access saved research',
    icon: <BookOpen className="h-5 w-5" />,
    href: '/research/citations',
  },
  {
    id: 'import',
    label: 'Import data',
    description: 'Upload your lists',
    icon: <Upload className="h-5 w-5" />,
    href: '/workspace',
  },
  {
    id: 'reports',
    label: 'Recent reports',
    description: 'View exported research',
    icon: <Zap className="h-5 w-5" />,
    href: '/research',
  },
]

export function QuickActions() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">Quick actions</h3>
        <p className="text-sm text-slate-600 mt-1">Get to research and data in one click</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            asChild
            variant="outline"
            className="h-auto justify-start p-4 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300"
          >
            <a href={action.href} className="flex flex-col items-start gap-2">
              <div className="text-slate-900">{action.icon}</div>
              <div className="text-left">
                <div className="font-medium text-sm text-foreground">{action.label}</div>
                <div className="text-xs text-slate-600">{action.description}</div>
              </div>
            </a>
          </Button>
        ))}
      </div>
    </div>
  )
}
