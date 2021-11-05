import React, { forwardRef, useMemo } from 'react'
import clsx from 'clsx'
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'
import useSyncedState from '../../hooks/use-synced-states'
import useLongPress from '../../hooks/use-long-press'
import { getPrecision, clamp } from './utils'

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
  onChange?: (value: number | string) => void
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

    function updateValue(value: number) {
      const clampValue = clamp(value, min, max)
      setInputValue(clampValue)
      if (onChange) {
        onChange(clampValue)
      }
    }

    function increment() {
      const newValue = parseFloat((inputValue + step).toFixed(precision))
      updateValue(newValue)
    }

    function decrement() {
      const newValue = parseFloat((inputValue - step).toFixed(precision))
      updateValue(newValue)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const newValue = parseFloat(event.target.value)
      updateValue(newValue)
    }

    const incrementRef = useLongPress<HTMLButtonElement>({ onPress: increment })
    const decrementRef = useLongPress<HTMLButtonElement>({ onPress: decrement })

    return (
      <div
        className={clsx(
          'flex group items-center justify-between border rounded-md focus-within:shadow-outline overflow-hidden',
          { 'cursor-not-allowed': disabled },
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
          onChange={handleChange}
          disabled={disabled}
          data-testid="input-number"
          {...restProps}
          ref={ref}
        />
        <div
          className={clsx(
            'flex flex-col items-center mr-1 text-gray-400 transition-opacity duration-500 opacity-0 group-hover:opacity-100 ',
            { hidden: disabled },
          )}
        >
          <button
            className={clsx('focus:outline-none', {
              'cursor-not-allowed': inputValue === max,
            })}
            ref={incrementRef}
            onClick={increment}
          >
            <HiOutlineChevronUp className="w-4 h-4" />
          </button>
          <button
            className={clsx('focus:outline-none', {
              'cursor-not-allowed': inputValue === min,
            })}
            ref={decrementRef}
            onClick={decrement}
          >
            <HiOutlineChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  },
)

InputNumber.displayName = 'InputNumber'
