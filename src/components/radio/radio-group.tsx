import React, { useMemo } from 'react'
import useSyncedState from 'hooks/use-synced-states'
import { Radio } from './radio'

export type RadioOptions = {
  label: string
  value: string
  disabled?: boolean
}
export type RadioGroupProps = {
  /** Specifies options of radio to render */
  options: (RadioOptions | string)[]
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

  const [checkedValue, setCheckedValue] = useSyncedState(defaultValue ?? '')

  return (
    <div className="flex items-center space-x-8">
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
          className={className}
          style={style}
        />
      ))}
    </div>
  )
}
