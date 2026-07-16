'use client'

import React from 'react'
import { CheckCircle2, Circle } from 'lucide-react'

export interface ResearchStage {
  id: string
  name: string
  description: string
  order: number
}

interface RuntimeStageProgressProps {
  stages: ResearchStage[]
  currentStage?: string
  completedStages?: string[]
  isStreaming?: boolean
}

export function RuntimeStageProgress({
  stages,
  currentStage,
  completedStages = [],
  isStreaming = false,
}: RuntimeStageProgressProps) {
  const stagesSorted = [...stages].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">Research progress</span>
          <span className="text-slate-500">
            {completedStages.length} of {stagesSorted.length} complete
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
            style={{
              width: `${Math.round((completedStages.length / stagesSorted.length) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Stage list */}
      <div className="space-y-2">
        {stagesSorted.map((stage, idx) => {
          const isCompleted = completedStages.includes(stage.id)
          const isActive = currentStage === stage.id
          const isUpcoming = !isCompleted && !isActive

          return (
            <div
              key={stage.id}
              className={`rounded-lg p-3 transition-all border ${
                isActive
                  ? 'border-blue-300 bg-blue-50'
                  : isCompleted
                    ? 'border-green-300 bg-green-50'
                    : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : isActive ? (
                  <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-semibold ${
                        isActive || isCompleted ? 'text-slate-900' : 'text-slate-600'
                      }`}
                    >
                      {idx + 1}. {stage.name}
                    </h4>
                    {isActive && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Active
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Complete
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{stage.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
