import React, { useState } from 'react'
import range from 'utils/range'
import clsx from 'clsx'

const MIN = 0
const MAX = 10

export type NPSScaleProps = {
  /** Callback function which is triggered when a user selects score */
  onSubmit?: (value: number) => void
}

export function NPSScale({ onSubmit }: NPSScaleProps) {
  const [value, setValue] = useState<number | undefined>()

  function onSelect(value: number) {
    onSubmit?.(value)
  }

  return (
    <div className="flex items-center justify-center">
      {range(MIN, MAX + 1).map((num) => (
        <div
          className="px-1"
          key={num}
          role="button"
          onMouseEnter={() => {
            setValue(num)
          }}
          onMouseLeave={() => {
            setValue(undefined)
          }}
          onClick={() => {
            onSelect(num)
          }}
        >
          <button
            className={clsx(
              'flex items-center justify-center transform w-8 h-8 text-xs font-semibold rounded-full transition-transform duration-300 focus:outline-none',
              value !== undefined && num <= value
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 bg-gray-200 opacity-75',
              num === value ? 'scale-125' : 'scale-100',
            )}
          >
            {num}
          </button>
        </div>
      ))}
    </div>
  )
}
