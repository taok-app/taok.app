'use client'

import React, { useState } from 'react'
import { BookmarkPlus, Zap, MessageCircle, Flag, FolderPlus } from 'lucide-react'

export function ResearchActionPanel() {
  const [saved, setSaved] = useState(false)
  const [followUpOpen, setFollowUpOpen] = useState(false)

  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-semibold text-slate-900 mb-1">Actions</h3>
        <p className="text-sm text-slate-600">Save and act on research findings</p>
      </div>

      {/* Primary actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setSaved(!saved)}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm font-medium ${
            saved
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
          }`}
        >
          <BookmarkPlus className="w-4 h-4" />
          {saved ? 'Saved' : 'Save'}
        </button>

        <button
          onClick={() => setFollowUpOpen(!followUpOpen)}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 bg-white transition-all text-sm font-medium"
        >
          <Zap className="w-4 h-4" />
          Follow-up
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 bg-white transition-all text-sm font-medium">
          <MessageCircle className="w-4 h-4" />
          Discuss
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:border-slate-300 bg-white transition-all text-sm font-medium">
          <FolderPlus className="w-4 h-4" />
          Create task
        </button>
      </div>

      {/* Follow-up prompt */}
      {followUpOpen && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
          <p className="text-sm font-medium text-slate-900">What would you like to research next?</p>
          <input
            type="text"
            placeholder="E.g., Find their hiring managers..."
            className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-1 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors">
              Continue research
            </button>
            <button
              onClick={() => setFollowUpOpen(false)}
              className="flex-1 px-3 py-1 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Quick tags */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-600">Tag for later</p>
        <div className="flex flex-wrap gap-2">
          {['Prospect', 'Competitor', 'Partner', 'Reference'].map((tag) => (
            <button
              key={tag}
              className="text-xs px-2 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
        <Flag className="w-3 h-3 inline mr-1" />
        Save your research to access it later from your dashboard.
      </div>
    </div>
  )
}
