import React, { useEffect, useMemo } from 'react'
import { useSyncedState } from 'hooks/useSyncedState'
import { isEqual, isEmpty } from 'lodash'
import { Checkbox } from './checkbox'

export function isArrayEqual<T>(arr1: T[] | undefined, arr2: T[] | undefined) {
  if (!arr1 || !arr2) {
    return false
  }
  return isEqual([...arr1].sort(), [...arr2].sort())
}

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

  const [checkedValues, setCheckedValues] = useSyncedState(value ?? [])

  useEffect(() => {
    const bothValuesEmpty = isEmpty(value) && isEmpty(checkedValues)
    const valuesChanged =
      !isArrayEqual(value, checkedValues) && !bothValuesEmpty
    console.log(value, checkedValues)
    if (onChange && valuesChanged) {
      onChange(checkedValues)
    }
  }, [onChange, value, checkedValues])

  return (
    <div className="flex items-center space-x-8">
      {checkboxOptions.map((option: OptionType) => (
        <Checkbox
          key={option.label}
          label={option.label}
          value={option.value}
          disabled={option?.disabled ?? disabled}
          checked={checkedValues?.indexOf(option.value) !== -1}
          onChange={(event) => {
            setCheckedValues((prevState) => {
              let selectedOptions = [...prevState]
              if (event.target.checked) {
                selectedOptions = [...selectedOptions, event.target.value]
              } else {
                selectedOptions = selectedOptions.filter(
                  (item) => item !== event.target.value,
                )
              }
              return selectedOptions
            })
          }}
          className={className}
          style={style}
        />
      ))}
    </div>
  )
}
