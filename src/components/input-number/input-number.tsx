import React from 'react'
import clsx from 'clsx'
import { ChevronDownOutline, ChevronUpOutline } from 'components/icons'

/**
 * InputNumber properties
 */
export type InputNumberProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'step' | 'className'
> & {
  /** The number to which the current value is increased or decreased. It can be an integer or decimal */
  step?: number
  /** Additional class applied to the input element */
  className?: string
}

/** Enter a number within certain range with the mouse or keyboard. */
export function InputNumber({
  step = 1,
  className,
  ...restProps
}: InputNumberProps) {
  return (
    <div
      className={clsx(
        'flex group items-center justify-between border rounded-md focus-within:shadow-outline overflow-hidden',
        className,
      )}
    >
      <input
        type="number"
        className="flex-1 px-3 py-2 text-sm text-gray-800 focus:outline-none"
        step={step}
        {...restProps}
      />
      <div className="flex-col items-center justify-between hidden text-gray-400 group-hover:flex">
        <button className="border focus:outline-none focus:bg-gray-100">
          <ChevronUpOutline className="w-4 h-4" />
        </button>
        <button className="border focus:outline-none focus:bg-gray-100">
          <ChevronDownOutline className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
