import React, { forwardRef, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { ChevronDownOutline, ChevronUpOutline } from 'components/icons'
import { useSyncedState } from 'hooks/useSyncedState'

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
      precision,
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

    // helper function to return number of digits after decimal place
    const getPrecisionFromValue = useCallback((value) => {
      const valueString = String(value)
      if (valueString.indexOf('.') >= 0) {
        return valueString.length - valueString.indexOf('.') - 1
      } else {
        return 0
      }
    }, [])

    const precisionValue = useMemo(() => {
      if (precision) {
        return precision
      }
      // using the maximum precision between step and inputValue
      return Math.max(
        getPrecisionFromValue(step),
        getPrecisionFromValue(inputValue),
      )
    }, [precision, step, inputValue, getPrecisionFromValue])

    // function to keep input value within min-max range
    const clampValue = useCallback(
      (value: number) => {
        let outputValue = value
        if (min !== undefined) {
          outputValue = Math.max(outputValue, min)
        }
        if (max !== undefined) {
          outputValue = Math.min(outputValue, max)
        }
        return outputValue
      },
      [min, max],
    )

    return (
      <div
        className={clsx(
          'flex group items-center justify-between border rounded-md focus-within:shadow-outline overflow-hidden',
          className,
        )}
        style={style}
      >
        <input
          type="number"
          className="w-full px-3 py-2 text-sm text-gray-800 focus:outline-none"
          value={inputValue}
          step={step}
          onChange={(event) => {
            const newValue = parseFloat(event.target.value)
            setInputValue(clampValue(newValue))
            if (onChange) {
              onChange(event)
            }
          }}
          {...restProps}
          ref={ref}
        />
        <div className="flex-col items-center hidden mr-1 text-gray-400 group-hover:flex ">
          <button
            className={clsx(
              'focus:outline-none',
              inputValue === max ? 'cursor-not-allowed' : undefined,
            )}
            onClick={() => {
              const newValue = parseFloat(
                (inputValue + step).toFixed(precisionValue),
              )
              setInputValue(clampValue(newValue))
            }}
          >
            <ChevronUpOutline className="w-4 h-4" />
          </button>
          <button
            className={clsx(
              'focus:outline-none',
              inputValue === min ? 'cursor-not-allowed' : undefined,
            )}
            onClick={() => {
              const newValue = parseFloat(
                (inputValue - step).toFixed(precisionValue),
              )
              setInputValue(clampValue(newValue))
            }}
          >
            <ChevronDownOutline className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  },
)

InputNumber.displayName = 'InputNumber'
