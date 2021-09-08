import React, { useContext, forwardRef } from 'react'
import clsx from 'clsx'
import Button, { ButtonProps } from '../button'
import { AlertContext } from './alert-context'

export type AlertButtonProps = Omit<ButtonProps, 'buttonType' | 'ref'> & {
  buttonType?: 'primary' | 'default'
  className?: string
}

export const AlertButton = forwardRef(
  (
    { buttonType = 'default', className, ...restProps }: AlertButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const { baseColor } = useContext(AlertContext)
    const buttonClasses =
      buttonType === 'primary'
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

AlertButton.displayName = 'AlertButton'
