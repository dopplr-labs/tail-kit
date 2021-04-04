import React, { forwardRef, useMemo } from 'react'
import clsx from 'clsx'
import { ChevronDownOutline, ChevronUpOutline } from 'components/icons'
import useSyncedState from 'hooks/use-synced-states'
import useLongPress from 'hooks/use-long-press'

/**
 * Helper function to compute precision
 *
 * @param value The number for which the precision is computed
 */
function getPrecision(value: number): number {
  const valueString = String(value)
  if (valueString.indexOf('.') >= 0) {
    return valueString.length - valueString.indexOf('.') - 1
  } else {
    return 0
  }
}

/**
 * Helper function to clamp the value between a min and max boundary
 *
 * @param value The value to be clamped
 * @param min The min boundary value
 * @param max The max boundary value
 */
function clamp(value: number, min?: number, max?: number) {
  let outputValue = value
  if (typeof min !== 'undefined') {
    outputValue = Math.max(outputValue, min)
  }
  if (typeof max !== 'undefined') {
    outputValue = Math.min(outputValue, max)
  }
  return outputValue
}

/**
 * InputNumber properties
 */
export type InputNumberProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'step' | 'className' | 'value' | 'defaultValue' | 'min' | 'max' | 'onChange'
> & {
  /** The number to which the current value is increased or decreased. It can be an integer or decimal */
  step?: number
  /** The current value */
  value?: number
  /** The initial value */
  defaultValue?: number
  /** The min value */
  min?: number
  /** The max value */
  max?: number
  /** The precision of input value */
  precision?: number
  /** To disable input number component */
  disabled?: boolean
  /** The callback triggered when the value is changed */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Additional class applied to the input element */
  className?: string
  /** Additional styles to apply */
  style?: React.CSSProperties
}

/** Enter a number within certain range with the mouse or keyboard. */
export const InputNumber = forwardRef(
  (
    {
      step = 1,
      value,
      defaultValue,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      precision: precisionProp,
      disabled,
      onChange,
      className,
      style,
      ...restProps
    }: InputNumberProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [inputValue, setInputValue] = useSyncedState(
      (value || defaultValue) ?? 0,
    )

    const precision = useMemo(() => {
      if (precisionProp) {
        return precisionProp
      }
      // using the maximum precision between step and inputValue
      return Math.max(getPrecision(step), getPrecision(inputValue))
    }, [precisionProp, step, inputValue])

    function increment() {
      const newValue = parseFloat((inputValue + step).toFixed(precision))
      setInputValue(clamp(newValue, min, max))
    }

    function decrement() {
      const newValue = parseFloat((inputValue - step).toFixed(precision))
      setInputValue(clamp(newValue, min, max))
    }

    const incrementRef = useLongPress<HTMLButtonElement>({ onPress: increment })
    const decrementRef = useLongPress<HTMLButtonElement>({ onPress: decrement })

    return (
      <div
        className={clsx(
          'flex group items-center justify-between border rounded-md focus-within:ring overflow-hidden',
          disabled ? 'cursor-not-allowed' : undefined,
          className,
        )}
        style={style}
      >
        <input
          type="number"
          className={clsx(
            'w-full px-3 py-2 text-sm focus:outline-none',
            disabled ? 'cursor-not-allowed text-gray-600' : 'text-gray-800',
          )}
          value={!isNaN(inputValue) ? inputValue : ''}
          step={step}
          onChange={(event) => {
            const newValue = parseFloat(event.target.value)
            setInputValue(clamp(newValue, min, max))
            if (onChange) {
              onChange(event)
            }
          }}
          disabled={disabled}
          data-testid="input-number"
          {...restProps}
          ref={ref}
        />
        <div
          className={clsx(
            'flex flex-col items-center mr-1 text-gray-400 transition-opacity duration-500 opacity-0 group-hover:opacity-100 ',
            disabled ? 'hidden' : undefined,
          )}
        >
          <button
            className={clsx(
              'focus:outline-none',
              inputValue === max ? 'cursor-not-allowed' : undefined,
            )}
            ref={incrementRef}
            onClick={increment}
          >
            <ChevronUpOutline className="w-4 h-4" />
          </button>
          <button
            className={clsx(
              'focus:outline-none',
              inputValue === min ? 'cursor-not-allowed' : undefined,
            )}
            ref={decrementRef}
            onClick={decrement}
          >
            <ChevronDownOutline className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  },
)

InputNumber.displayName = 'InputNumber'
