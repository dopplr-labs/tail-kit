import React from 'react'
export declare type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon?: JSX.Element
  inputClassName?: string
  inputStyle?: React.CSSProperties
}
export declare const Input: React.ForwardRefExoticComponent<
  Pick<
    React.ClassAttributes<HTMLInputElement> &
      React.InputHTMLAttributes<HTMLInputElement> & {
        icon?: JSX.Element
        inputClassName?: string
        inputStyle?: React.CSSProperties
      },
    | 'icon'
    | 'key'
    | keyof React.InputHTMLAttributes<HTMLInputElement>
    | 'inputClassName'
    | 'inputStyle'
  > &
    React.RefAttributes<HTMLInputElement>
>
