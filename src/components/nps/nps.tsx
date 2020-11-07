import React, { useState } from 'react'
import clsx from 'clsx'
import { NPSScale } from './components/nps-scale'

/**
 * NPS widget properties
 */
export type NPSProps = {
  /** Title message to show above NPS scale */
  title?: string
  /** Callback function which is triggered when a user selects score */
  onSubmit?: (score: number) => void
  /** Message to show after score selection by user */
  message?: (score: number) => React.ReactNode
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
  title = 'How likely are you to recommend us to your friends and colleagues?',
  onSubmit,
  message = () => 'Thank you for your feedback!',
  className,
  style,
}: NPSProps) {
  const [score, setScore] = useState<number | null>(null)

  function handleSubmit(score: number) {
    setScore(score)
    onSubmit?.(score)
  }

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-y-3',
        className,
      )}
      style={style}
    >
      {score ? (
        <div className="text-sm text-gray-700">{message?.(score)}</div>
      ) : (
        <>
          <div className="font-medium text-gray-700">{title}</div>
          <div className="space-y-2">
            <NPSScale onSubmit={handleSubmit} />
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-gray-500">Not at all likely</span>
              <span className="text-xs text-gray-500">Extremely likely</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
