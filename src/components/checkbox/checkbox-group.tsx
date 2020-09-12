import React, { useState } from 'react'
import { Checkbox } from './checkbox'

export type OptionType = {
  label: string
  value?: string
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
  const [checkedItem, setCheckedItem] = useState(
    optionProp.map((option) => defaultValue?.indexOf(option.label) !== -1),
  )

  return (
    <div className="space-x-8">
      {optionProp?.map((option: any, index) => (
        <Checkbox
          key={option.label}
          label={option.label}
          value={option?.value}
          disabled={option?.disabled ?? disabled}
          checked={checkedItem[index]}
          onChange={() => {
            setCheckedItem((prevState) =>
              prevState.map((item, id) => (id === index ? !item : item)),
            )
            if (onChange) {
              const checkedValues = optionProp
                .filter((option, index) => checkedItem[index])
                .map((option) => option.label)
              onChange(checkedValues)
            }
          }}
        />
      ))}
    </div>
  )
}
