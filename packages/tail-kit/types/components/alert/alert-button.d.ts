import React from 'react'
import { ButtonProps } from 'components/button/button'
export declare enum ButtonType {
  primary = 'primary',
  default = 'default',
}
export declare type AlertButtonProps = Omit<
  ButtonProps,
  'buttonType' | 'ref'
> & {
  buttonType?: ButtonType
  className?: string
}
export declare const AlertButton: React.ForwardRefExoticComponent<
  Omit<ButtonProps, 'ref' | 'buttonType'> & {
    buttonType?: ButtonType
    className?: string
  } & React.RefAttributes<HTMLButtonElement>
> & {
  ButtonType: typeof ButtonType
}
