import React, { useMemo } from 'react'
import { BasicSelect } from './basic-select'
import { MultiSelect } from './multi-select'
import { SearchSelect } from './search-select'

export type OptionType = {
  label: string
  value: string
  icon?: React.ReactNode
}

/**
 * Select component propertie
 */
export type SelectProps = {
  /** Options to render in dropdown */
  options: (OptionType | string)[]
  /** Intial label in toggle button */
  placeholder?: string
  /** Define default selection for Select component */
  defaultValue?: string | string[]
  /** Disable select component */
  disabled?: boolean
  /** Show clear button to clear selection */
  allowClear?: boolean
  /** The callback function that is trigered when an item is selected */
  onChange?: ({
    selectedItem,
  }: {
    selectedItem: OptionType | string[] | undefined
  }) => void
  /** Define the type of select component */
  mode?: 'basic' | 'search' | 'multiple'
  /** Apply class to Select component */
  className?: string
  /** Add style object for custom styling */
  style?: React.CSSProperties
}
export function Select({
  options,
  placeholder,
  defaultValue,
  disabled,
  allowClear,
  onChange,
  mode = 'basic',
  className,
  style,
}: SelectProps) {
  const selectOptions = useMemo(() => {
    return options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option } as OptionType
      } else {
        return option
      }
    })
  }, [options])

  switch (mode) {
    case 'basic':
      return (
        <BasicSelect
          options={selectOptions}
          placeholder={placeholder}
          defaultValue={
            Array.isArray(defaultValue) ? defaultValue[0] : defaultValue
          }
          disabled={disabled}
          allowClear={allowClear}
          onChange={onChange}
          className={className}
          style={style}
        />
      )
    case 'search':
      return (
        <SearchSelect
          options={selectOptions}
          placeholder={placeholder}
          defaultValue={
            Array.isArray(defaultValue) ? defaultValue[0] : defaultValue
          }
          disabled={disabled}
          allowClear={allowClear}
          onChange={onChange}
          className={className}
          style={style}
        />
      )
    case 'multiple':
      return (
        <MultiSelect
          options={selectOptions}
          placeholder={placeholder}
          defaultValue={Array.isArray(defaultValue) ? defaultValue : undefined}
          disabled={disabled}
          allowClear={allowClear}
          onChange={onChange}
          className={className}
          style={style}
        />
      )
  }
}
