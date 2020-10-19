import React, { useState } from 'react'
import { range } from 'lodash-es'
import clsx from 'clsx'

export type NpsProps = {
  message?: string
}

export function NPSInput({
  message = 'How likely are you to recommend us to your friends and colleagues?',
}: NpsProps) {
  const [npsScore, setNpsScore] = useState<number | null>(null)
  return (
    <div className="flex flex-col items-center justify-center gap-y-3">
      <div className="font-medium text-gray-700">{message}</div>
      <div className="space-y-2">
        <div className="flex items-center justify-center">
          {range(0, 11).map((value) => (
            <div
              className="px-1"
              key={value}
              role="button"
              onMouseEnter={() => {
                setNpsScore(value)
              }}
              onMouseLeave={() => {
                setNpsScore(null)
              }}
            >
              <button
                className={clsx(
                  'flex items-center justify-center transform w-8 h-8 text-xs font-semibold rounded-full transition-transform duration-300 focus:outline-none',
                  npsScore !== null && value <= npsScore
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 bg-gray-200 opacity-75',
                  value === npsScore ? 'scale-125' : 'scale-100',
                )}
              >
                {value}
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-gray-500">Not at all likely</span>
          <span className="text-xs text-gray-500">Extremely likely</span>
        </div>
      </div>
    </div>
  )
}
