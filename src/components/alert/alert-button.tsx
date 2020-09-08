import React, { useContext, forwardRef } from 'react'
import clsx from 'clsx'
import Button, { ButtonProps } from 'components/button'
import { AlertContext } from './alert'

export enum ButtonType {
  primary = 'primary',
  default = 'default',
}

export type AlertButtonProps = Omit<ButtonProps, 'buttonType' | 'ref'> & {
  buttonType?: ButtonType
  className?: string
}

const AlertButtonComponent = forwardRef(
  (
    {
      buttonType = ButtonType.default,
      className,
      ...restProps
    }: AlertButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const { baseColor } = useContext(AlertContext)
    const buttonClasses =
      buttonType === ButtonType.primary
        ? `alert-button-primary-${baseColor}`
        : `alert-button-default-${baseColor}`
    return (
      <Button
        {...restProps}
        className={clsx(buttonClasses, className)}
        buttonType={buttonType}
        ref={ref}
      />
    )
  },
)
AlertButtonComponent.displayName = 'AlertButton'

export const AlertButton = Object.assign(AlertButtonComponent, {
  ButtonType: ButtonType,
})
