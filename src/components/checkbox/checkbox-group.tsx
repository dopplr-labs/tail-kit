import React from 'react'
import { Checkbox } from './checkbox'

export type OptionType = {
  label?: string
  value?: string
  disabled?: boolean
}

export type CheckboxGroupProps = {
  options: OptionType[] | string[]
  defaultValue?: string[]
  disabled?: boolean
}

export function CheckboxGroup({
  options,
  defaultValue,
  disabled,
}: CheckboxGroupProps) {
  function getOptions() {
    return (options as Array<OptionType>).map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option } as OptionType
      } else {
        return option
      }
    })
  }
  const optionProp = getOptions()

  return (
    <div className="space-x-8">
      {optionProp?.map((option: any) => (
        <Checkbox
          key={option.label}
          label={option.label}
          value={option?.value}
          disabled={option?.disabled ?? disabled}
          defaultChecked={
            !!defaultValue?.find((value) => option.label === value)
          }
        />
      ))}
    </div>
  )
}
