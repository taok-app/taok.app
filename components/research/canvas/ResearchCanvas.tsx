'use client'

import React, { useEffect, useRef, useState } from 'react'
import MessageList from './MessageList'
import PromptComposer from './PromptComposer'
import type { ResearchStreamStatus } from '@/types/research'

export default function ResearchCanvas() {
  const [messages, setMessages] = useState<Array<{id:string, role:'user'|'assistant', text:string}>>([])
  const [status] = useState<ResearchStreamStatus>({ stage: 'Completed', progress: 1 })

  useEffect(() => {
    // skeleton initial fetch
    setTimeout(() => setMessages([{ id: 'm1', role: 'assistant', text: 'Welcome to the Research Workspace — start with a prompt below.' }]), 300)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Canvas</h2>
          <div className="text-xs text-slate-500">Status: <span className="font-medium">{status.stage}</span></div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <MessageList messages={messages} />
      </div>

      <div className="p-4 border-t">
        <PromptComposer onSubmit={(text) => {
          const id = String(Date.now())
          setMessages((m) => [...m, { id, role: 'user', text }])
          // optimistic assistant
          setMessages((m) => [...m, { id: id + '-a', role: 'assistant', text: 'Working on it…' }])
        }} />
      </div>
    </div>
  )
}
