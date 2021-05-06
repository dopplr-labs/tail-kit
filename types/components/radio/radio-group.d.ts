import React from 'react'
export declare type RadioOptions = {
  label: string
  value: string
  disabled?: boolean
}
/**
 * RadioGroup properties
 */
export declare type RadioGroupProps = {
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
export declare function RadioGroup({
  options,
  value,
  defaultValue,
  disabled,
  onChange,
  className,
  style,
}: RadioGroupProps): JSX.Element
