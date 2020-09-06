import React, { useContext } from 'react'
import clsx from 'clsx'
import Button, { ButtonProps } from 'components/button'
import { AlertContext } from './alert'

export enum ButtonType {
  primary = 'primary',
  default = 'default',
}

export type AlertButtonProps = Omit<ButtonProps, 'buttonType'> & {
  buttonType?: ButtonType
  className?: string
}

export function AlertButton({
  buttonType = ButtonType.default,
  className,
  ...restProps
}: AlertButtonProps) {
  const { baseColor } = useContext(AlertContext)
  const buttonClasses =
    buttonType === ButtonType.primary
      ? `bg-${baseColor}-500 text-white`
      : `text-${baseColor}-500 border-${baseColor}-500`
  return (
    <Button
      {...restProps}
      className={clsx(buttonClasses, className)}
      buttonType={buttonType}
    />
  )
}
