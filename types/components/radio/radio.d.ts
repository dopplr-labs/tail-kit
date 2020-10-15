import React from 'react'
import { RadioGroup } from 'components/radio/radio-group'
/**
 * Radio properties
 */
export declare type RadioProps = {
  /** HTML checked attribute for input element to set input status true or false */
  checked?: boolean
  /** Default checked property to initialize component */
  defaultChecked?: boolean
  /** To show label on the right side of radio */
  label?: string
  /** HTML value attribute for input element */
  value?: string | number
  /** Use disabled property to disable user input in radio */
  disabled?: boolean
  error?: boolean
  /** The callback function that is triggered when the state changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Additional class applied to radio */
  className?: string
  /** Styles property to apply on the entire Radio component */
  style?: React.CSSProperties
}
export declare const RadioComponent: React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<HTMLInputElement>
>
export declare const Radio: React.ForwardRefExoticComponent<
  RadioProps & React.RefAttributes<HTMLInputElement>
> & {
  RadioGroup: typeof RadioGroup
}
