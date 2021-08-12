import React, { useMemo } from 'react'
import useSyncedState from 'hooks/use-synced-states'
import clsx from 'clsx'
import { Radio } from './radio'

export type RadioOptions = {
  label: string
  value: string
  disabled?: boolean
}

/**
 * RadioGroup properties
 */
export type RadioGroupProps = {
  /** Specifies options of radio to render */
  options: (RadioOptions | string)[]
  /** Radio value */
  value?: string
  /** Default selected radio value */
  defaultValue?: string
  /** To disable all radio components */
  disabled?: boolean
  /** The callback function that is triggered when the state changes */
  onChange?: (checkedValue: string) => void
  /** Additional class to apply on each individual radio */
  className?: string
  /** Apply styles on each individual radio */
  style?: React.CSSProperties
}

export function RadioGroup({
  options,
  value,
  defaultValue,
  disabled = false,
  onChange,
  className,
  style,
}: RadioGroupProps) {
  const radioOptions = useMemo(() => {
    return options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option }
      } else {
        return option
      }
    })
  }, [options])

  const [checkedValue, setCheckedValue] = useSyncedState(
    (value || defaultValue) ?? '',
  )

  return (
    <div
      className={clsx('flex items-center space-x-8', className)}
      style={style}
    >
      {radioOptions.map((option) => (
        <Radio
          key={option.label}
          label={option.label}
          value={option.value}
          disabled={option?.disabled ?? disabled}
          checked={checkedValue === option.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCheckedValue(event.target.value)
            onChange?.(event.target.value)
          }}
        />
      ))}
    </div>
  )
}
