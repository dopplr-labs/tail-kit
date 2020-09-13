import React, { useMemo } from 'react'
import { Checkbox } from './checkbox'

export type OptionType = {
  label: string
  value: string
  disabled?: boolean
}

export type CheckboxGroupProps = {
  /** Specifies options of checkbox to render */
  options: (OptionType | string)[]
  /** Default selected values */
  value?: string[]
  /** If disable all checkboxes */
  disabled?: boolean
  /** The callback function that is triggered when the state changes */
  onChange?: (checkedValues: string[]) => void
  /** Additional class to apply on each individual checkbox */
  className?: string
  /** Apply styles on each individual checkbox */
  style?: React.CSSProperties
}

export function CheckboxGroup({
  options,
  value,
  disabled,
  onChange,
  className,
  style,
}: CheckboxGroupProps) {
  const checkboxOptions = useMemo(() => {
    return options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option } as OptionType
      } else {
        return option
      }
    })
  }, [options])

  return (
    <div className="space-x-8">
      {checkboxOptions.map((option: OptionType) => (
        <Checkbox
          key={option.label}
          label={option.label}
          value={option.value}
          disabled={option?.disabled ?? disabled}
          checked={value?.indexOf(option.value) !== -1}
          onChange={(event) => {
            let selectedOptions = value ? [...value] : []
            if (event.target.checked) {
              selectedOptions = [...selectedOptions, event.target.value]
            } else {
              selectedOptions = selectedOptions.filter(
                (item) => item !== event.target.value,
              )
            }
            if (onChange) {
              onChange(selectedOptions)
            }
          }}
          className={className}
          style={style}
        />
      ))}
    </div>
  )
}
