import React, { useState } from 'react'
import { range } from 'lodash-es'
import clsx from 'clsx'

/**
 * NPS widget properties
 */
export type NPSProps = {
  /** Title message to show above NPS scale */
  message?: string
  /** Callback function which is triggered when a user selects score */
  onSubmit?: (value: number) => void
  /** Additional classes to apply on NPSInput component */
  className?: string
  /** Additional styles to apply on NPSInput component */
  style?: React.CSSProperties
}

/**
 * The Net Promoter Score (NPS) methodology is based on asking customers a single question
 * that predicts the likelihood of both repurchase and referral: “How likely is it that you would recommend this company to a friend or colleague?” Customers rate their answers on a scale from 0 to 10.
 *
 * The answers customers provide are classified as follows:
 *
 *  * 0–6 = Detractors—unhappy customers who can hurt your brand through negative word-of-mouth
 *  * 7–8 = Passives—satisfied but indifferent customers who could be swayed by the competition
 *  * 9–10 = Promoters—loyal customers who will keep buying and referring others
 *
 * Finally, NPS score can be easily calculated using a mathematical formula
 * ** ((Promoters - Detractors) / Respondents) * 100 **
 */
export function NPSInput({
  message = 'How likely are you to recommend us to your friends and colleagues?',
  onSubmit,
  className,
  style,
}: NPSProps) {
  const [npsScore, setNpsScore] = useState<number | null>(null)

  function onSelect(value: number) {
    onSubmit?.(value)
  }

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-y-3',
        className,
      )}
      style={style}
    >
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
              onClick={() => onSelect(value)}
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
