import React, { useMemo } from 'react'
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
export function InputNumber({
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
}: InputNumberProps) {
  const [inputValue, setInputValue] = useSyncedState(
    (value || defaultValue) ?? 0,
  )

  const getPrecision = useMemo(() => {
    if (precision) {
      return precision
    }
    const stepString = String(step)
    let stepPrecision = 0
    if (stepString.indexOf('.') >= 0) {
      stepPrecision = stepString.length - stepString.indexOf('.') - 1
    }
    const inputValueString = String(inputValue)
    let inputValuePrecision = 0
    if (inputValueString.indexOf('.') >= 0) {
      inputValuePrecision =
        inputValueString.length - inputValueString.indexOf('.') - 1
    }
    return Math.max(stepPrecision, inputValuePrecision)
  }, [precision, step, inputValue])

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
        className="flex-1 px-3 py-2 text-sm text-gray-800 focus:outline-none"
        value={inputValue}
        step={step}
        onChange={(event) => {
          const newValue = parseFloat(event.target.value)
          setInputValue((prevState) =>
            min !== undefined &&
            newValue >= min &&
            max !== undefined &&
            newValue <= max
              ? newValue
              : prevState,
          )
          if (onChange) {
            onChange(event)
          }
        }}
        {...restProps}
      />
      <div className="flex-col items-center justify-between hidden text-gray-400 group-hover:flex">
        <button
          className={clsx(
            'border focus:outline-none focus:bg-gray-100',
            inputValue === max ? 'cursor-not-allowed' : undefined,
          )}
          onClick={() => {
            setInputValue((prevState) => {
              const newValue = parseFloat(
                (prevState + step).toFixed(getPrecision),
              )
              if (max !== undefined && newValue <= max) {
                return newValue
              } else {
                return prevState
              }
            })
          }}
        >
          <ChevronUpOutline className="w-4 h-4" />
        </button>
        <button
          className={clsx(
            'border focus:outline-none focus:bg-gray-100',
            inputValue === min ? 'cursor-not-allowed' : undefined,
          )}
          onClick={() => {
            setInputValue((prevState) => {
              const newValue = parseFloat(
                (prevState - step).toFixed(getPrecision),
              )
              if (min !== undefined && newValue >= min) {
                return newValue
              } else {
                return prevState
              }
            })
          }}
        >
          <ChevronDownOutline className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
