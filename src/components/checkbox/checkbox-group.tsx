import React, { useState } from 'react'
import { Checkbox } from './checkbox'

export type OptionType = {
  label: string
  value: string
  disabled?: boolean
}

export type CheckboxGroupProps = {
  options: OptionType[] | string[]
  defaultValue?: string[]
  disabled?: boolean
  onChange?: (checkedValues: string[]) => void
}

export function CheckboxGroup({
  options,
  defaultValue,
  disabled,
  onChange,
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
  const [checkedItem, setCheckedItem] = useState(defaultValue)

  return (
    <div className="space-x-8">
      {optionProp?.map((option: OptionType) => (
        <Checkbox
          key={option.label}
          label={option.label}
          value={option.value}
          disabled={option?.disabled ?? disabled}
          checked={checkedItem?.indexOf(option.value) !== -1}
          onChange={() => {
            setCheckedItem((prevState) =>
              prevState?.indexOf(option.value) !== -1
                ? prevState?.filter((item) => item !== option.value)
                : [...prevState, option.value],
            )
            if (onChange && checkedItem) {
              onChange(checkedItem)
            }
          }}
        />
      ))}
    </div>
  )
}
