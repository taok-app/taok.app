'use client'

import React, { useState } from 'react'
import { Download, Copy, Share2, FileText, Check } from 'lucide-react'

export function ExportPanel() {
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'pdf'>('json')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportOptions = [
    { format: 'json', label: 'JSON', icon: FileText, description: 'Machine-readable structured data' },
    { format: 'csv', label: 'CSV', icon: FileText, description: 'Spreadsheet compatible format' },
    { format: 'pdf', label: 'PDF', icon: FileText, description: 'Formatted report document' },
  ]

  return (
    <div className="rounded-lg border border-slate-200 p-4 bg-slate-50 space-y-4">
      <div>
        <h3 className="font-semibold text-slate-900 mb-1">Export Research</h3>
        <p className="text-sm text-slate-600">Download or share your findings</p>
      </div>

      {/* Format selection */}
      <div className="space-y-2">
        {exportOptions.map((option) => {
          const Icon = option.icon
          const isSelected = exportFormat === option.format
          return (
            <button
              key={option.format}
              onClick={() => setExportFormat(option.format as 'json' | 'csv' | 'pdf')}
              className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all ${
                isSelected
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <Icon className={`w-4 h-4 mt-1 flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
              <div className="text-left flex-1">
                <p className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                  {option.label}
                </p>
                <p className="text-xs text-slate-600">{option.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors text-sm font-medium">
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm font-medium ${
            copied
              ? 'bg-green-50 border-green-300 text-green-700'
              : 'border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors text-sm font-medium">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Info */}
      <p className="text-xs text-slate-600 bg-white rounded p-2 border border-slate-200">
        Exports include all findings, sources, and confidence assessments from your research session.
      </p>
    </div>
  )
}
