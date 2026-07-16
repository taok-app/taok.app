'use client'

import React, { useState } from 'react'

export default function PromptComposer({ onSubmit, disabled = false }: { onSubmit: (text: string) => void; disabled?: boolean }) {
  const [value, setValue] = useState('')

  const examplePrompts = [
    'Find SaaS companies that sell to mid-market manufacturers',
    'Identify decision makers at Fortune 500 tech companies',
    'Analyze the AI/ML startup funding landscape in 2024',
  ]

  const handleExampleClick = (example: string) => {
    setValue(example)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Input area */}
      <form 
        onSubmit={(e) => { 
          e.preventDefault()
          if (!disabled && value.trim()) { 
            onSubmit(value.trim())
            setValue('')
          }
        }} 
        className="flex gap-2"
      >
        <label htmlFor="research-prompt" className="sr-only">Research prompt</label>
        <input
          id="research-prompt"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          placeholder="Describe your research question…"
          className="min-w-0 flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 transition-all"
        />
        <button 
          type="submit" 
          disabled={disabled || !value.trim()} 
          className="rounded-lg bg-slate-900 hover:bg-slate-800 px-4 py-3 text-white font-medium disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        >
          Research
        </button>
      </form>

      {/* Example prompts */}
      {!value && !disabled && (
        <div className="space-y-2">
          <p className="text-xs text-slate-600 font-medium">Try these:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(prompt)}
                className="text-xs px-3 py-1 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Disabled message */}
      {disabled && (
        <p className="text-xs text-slate-600 bg-slate-50 rounded-lg p-3">
          Live research execution is not connected in this preview. Use the <a href="/research/citations" className="text-blue-600 hover:text-blue-700 font-medium">citation workspace</a> to see research in action.
        </p>
      )}
    </div>
  )
}
