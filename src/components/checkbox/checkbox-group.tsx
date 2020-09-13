import React, { useMemo } from 'react'
import { Checkbox } from './checkbox'

export type OptionType = {
  label: string
  value: string
  disabled?: boolean
}

export type CheckboxGroupProps = {
  options: (OptionType | string)[]
  value?: string[]
  disabled?: boolean
  onChange?: (checkedValues: string[]) => void
}

export function CheckboxGroup({
  options,
  value,
  disabled,
  onChange,
}: CheckboxGroupProps) {
  const checkboxOptions = useMemo(() => {
    return (options as Array<OptionType>).map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option } as OptionType
      } else {
        return option
      }
    })
  }, [options])

  return (
    <div className="flex items-center space-x-8">
      {checkboxOptions?.map((option: OptionType) => (
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
        />
      ))}
    </div>
  )
}
