'use client'

import React, { useState } from 'react'
import { Filter, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react'

interface Finding {
  id: string
  title: string
  category: 'company' | 'person' | 'market' | 'insight'
  confidence: 'high' | 'medium' | 'low'
  description: string
  sourceCount: number
}

export function ResultsOrganizer() {
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [filterConfidence, setFilterConfidence] = useState<string | null>(null)
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null)

  // Placeholder findings
  const findings: Finding[] = [
    {
      id: '1',
      title: 'TechCorp Inc.',
      category: 'company',
      confidence: 'high',
      description: 'B2B SaaS platform serving mid-market manufacturers with supply chain optimization',
      sourceCount: 12,
    },
    {
      id: '2',
      title: 'Sarah Chen - VP Product',
      category: 'person',
      confidence: 'high',
      description: 'Decision maker at manufacturing tech company, 15+ years industry experience',
      sourceCount: 8,
    },
    {
      id: '3',
      title: 'Manufacturing Tech Market Growth',
      category: 'market',
      confidence: 'medium',
      description: 'Expected CAGR of 12% through 2027 driven by digital transformation initiatives',
      sourceCount: 5,
    },
  ]

  const categories = [
    { key: 'company', label: 'Companies', icon: '🏢', color: 'blue' },
    { key: 'person', label: 'People', icon: '👥', color: 'purple' },
    { key: 'market', label: 'Markets', icon: '📈', color: 'green' },
    { key: 'insight', label: 'Insights', icon: '💡', color: 'orange' },
  ]

  const filteredFindings = findings.filter((f) => {
    if (filterCategory && f.category !== filterCategory) return false
    if (filterConfidence && f.confidence !== filterConfidence) return false
    return true
  })

  const confidenceColor = {
    high: 'text-green-600 bg-green-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-red-600 bg-red-50',
  }

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-slate-600" />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilterCategory(filterCategory === cat.key ? null : cat.key)}
              className={`text-xs px-3 py-1 rounded-full transition-all ${
                filterCategory === cat.key
                  ? `bg-${cat.color}-100 text-${cat.color}-700 border border-${cat.color}-300`
                  : 'border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
          <div className="border-l border-slate-200" />
          {['high', 'medium', 'low'].map((conf) => (
            <button
              key={conf}
              onClick={() => setFilterConfidence(filterConfidence === conf ? null : conf)}
              className={`text-xs px-3 py-1 rounded-full transition-all capitalize ${
                filterConfidence === conf
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {conf} confidence
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-600">
        {filteredFindings.length} {filteredFindings.length === 1 ? 'result' : 'results'} found
      </p>

      {/* Findings list */}
      <div className="space-y-3">
        {filteredFindings.map((finding) => {
          const isExpanded = expandedFinding === finding.id
          return (
            <div
              key={finding.id}
              className="rounded-lg border border-slate-200 hover:border-slate-300 transition-all overflow-hidden"
            >
              <button
                onClick={() => setExpandedFinding(isExpanded ? null : finding.id)}
                className="w-full text-left p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-slate-900 truncate">{finding.title}</h4>
                    {finding.confidence === 'high' && (
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                    )}
                    {finding.confidence === 'low' && (
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 truncate">{finding.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      confidenceColor[finding.confidence]
                    }`}
                  >
                    {finding.confidence}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 text-sm text-slate-700 space-y-2">
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Details</p>
                    <p>{finding.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-600">{finding.sourceCount} sources cited</span>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      View sources →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
