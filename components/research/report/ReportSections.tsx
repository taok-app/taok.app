'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'

export function ExecutiveSummary() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Executive Summary</h2>
      <div className="space-y-3 text-slate-700 leading-relaxed">
        <p>
          This research identified 24 companies matching your market criteria with 18 key decision makers tracked across the sector. The market shows strong consolidation patterns with mid-market players gaining momentum in 2024.
        </p>
        <p>
          Key finding: Companies implementing AI-powered solutions show 3.2x faster growth compared to traditional approaches. Budget allocation increasing by 28% year-over-year in this segment.
        </p>
      </div>
    </div>
  )
}

export function KeyFindings() {
  const findings = [
    { title: 'Market Growth', value: '+34% YoY', trend: 'up' },
    { title: 'Average Deal Size', value: '$2.4M', trend: 'up' },
    { title: 'Sales Cycle', value: '4.2 months', trend: 'down' },
    { title: 'Win Rate', value: '28%', trend: 'up' },
  ]

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Key Findings</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {findings.map((finding, idx) => (
          <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <p className="text-sm font-medium text-slate-600 mb-1">{finding.title}</p>
            <p className="text-2xl font-bold text-slate-900">{finding.value}</p>
            <p className={`text-xs mt-2 font-medium ${finding.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
              {finding.trend === 'up' ? '↑' : '↓'} vs last quarter
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CompaniesSection() {
  const companies = [
    { name: 'TechCorp Inc', industry: 'SaaS', size: 'Mid-market', decision_makers: 3 },
    { name: 'CloudFirst Systems', industry: 'Cloud', size: 'Enterprise', decision_makers: 5 },
    { name: 'DataFlow Analytics', industry: 'Data', size: 'Mid-market', decision_makers: 2 },
    { name: 'InnovateTech Labs', industry: 'AI/ML', size: 'Growth', decision_makers: 4 },
  ]

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Target Companies</h2>
      <div className="space-y-3">
        {companies.map((company, idx) => (
          <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors">
            <div>
              <h3 className="font-semibold text-slate-900">{company.name}</h3>
              <p className="text-sm text-slate-600">{company.industry} • {company.size}</p>
            </div>
            <Badge variant="secondary">{company.decision_makers} contacts</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PeopleSection() {
  const people = [
    { name: 'Sarah Chen', title: 'VP Product', company: 'TechCorp Inc', confidence: 'high' },
    { name: 'Michael Rodriguez', title: 'Director of Strategy', company: 'CloudFirst Systems', confidence: 'high' },
    { name: 'Emma Thompson', title: 'Head of Engineering', company: 'DataFlow Analytics', confidence: 'medium' },
    { name: 'James Park', title: 'VP Sales', company: 'InnovateTech Labs', confidence: 'high' },
  ]

  const confidenceColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Decision Makers</h2>
      <div className="space-y-3">
        {people.map((person, idx) => (
          <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors">
            <div>
              <h3 className="font-semibold text-slate-900">{person.name}</h3>
              <p className="text-sm text-slate-600">{person.title} at {person.company}</p>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium border ${confidenceColor(person.confidence)}`}>
              {person.confidence === 'high' ? 'High confidence' : 'Medium confidence'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SourcesSection() {
  const sources = [
    { name: 'Industry Report 2024', type: 'Report', citations: 3 },
    { name: 'TechCorp Press Release', type: 'News', citations: 2 },
    { name: 'LinkedIn Company Profile', type: 'Social', citations: 4 },
    { name: 'Crunchbase Dataset', type: 'Database', citations: 5 },
  ]

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Sources</h2>
      <div className="space-y-2">
        {sources.map((source, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {source.type}
              </span>
              <span className="text-slate-700">{source.name}</span>
            </div>
            <span className="text-xs text-slate-500">{source.citations} citations</span>
          </div>
        ))}
      </div>
    </div>
  )
}
