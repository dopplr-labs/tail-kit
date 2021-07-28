import React from 'react'
import { ButtonProps } from 'components/button/button'
export declare type AlertButtonProps = Omit<
  ButtonProps,
  'buttonType' | 'ref'
> & {
  buttonType?: 'primary' | 'default'
  className?: string
}
export declare const AlertButton: React.ForwardRefExoticComponent<
  Omit<ButtonProps, 'ref' | 'buttonType'> & {
    buttonType?: 'primary' | 'default'
    className?: string
  } & React.RefAttributes<HTMLButtonElement>
>
