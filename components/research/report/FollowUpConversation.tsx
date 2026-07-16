'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'

export function FollowUpConversation() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant' as const,
      content: 'Your research is complete! I found 24 companies matching your criteria. What would you like to know more about?',
      timestamp: Date.now() - 60000,
    },
    {
      id: '2',
      role: 'user' as const,
      content: 'Which companies are growing fastest?',
      timestamp: Date.now() - 45000,
    },
    {
      id: '3',
      role: 'assistant' as const,
      content: 'Based on recent funding and hiring trends, TechCorp Inc, CloudFirst Systems, and InnovateTech Labs are growing fastest. TechCorp just raised a Series B, CloudFirst expanded to 3 new markets, and InnovateTech increased hiring by 45% YoY.',
      timestamp: Date.now() - 30000,
    },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    
    // Add user message
    const userMessage = {
      id: String(Date.now()),
      role: 'user' as const,
      content: input,
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsStreaming(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const assistantMessage = {
        id: String(Date.now()),
        role: 'assistant' as const,
        content: 'I can help you explore more aspects of this market. What specific information interests you?',
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsStreaming(false)
    }, 1500)
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Follow-up Questions</h2>

      {/* Conversation */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-sm px-4 py-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-slate-900 text-white rounded-br-none'
                  : 'bg-slate-100 text-slate-900 rounded-bl-none'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-slate-300' : 'text-slate-500'}`}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isStreaming && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isStreaming && handleSend()}
          placeholder="Ask a follow-up question..."
          disabled={isStreaming}
          className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isStreaming}
          className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
