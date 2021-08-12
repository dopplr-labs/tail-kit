import React from 'react'
export declare type OptionType = {
  label: string
  value: string
  disabled?: boolean
}
export declare type CheckboxGroupProps = {
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
export declare function CheckboxGroup({
  options,
  value,
  disabled,
  onChange,
  className,
  style,
}: CheckboxGroupProps): JSX.Element
