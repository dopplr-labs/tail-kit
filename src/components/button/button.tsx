import React, { forwardRef } from 'react'
import clsx from 'clsx'

export enum ButtonType {
  primary = 'primary',
  default = 'default',
  danger = 'danger',
  link = 'link',
}

/**
 * Button properties
 */
export type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'children'
> & {
  /** text rendered inside button */
  label?: string
  /** icon rendered */
  icon?: JSX.Element
  /** type of the button */
  buttonType?: ButtonType
  /** additional class applied to button */
  className?: string
  /** button styles */
  style?: React.CSSProperties
}

const ButtonComponent = forwardRef(
  (
    {
      label,
      icon,
      buttonType = ButtonType.default,
      className,
      style,
      ...restProps
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const iconOnlyButton = icon && !label

    return (
      <button
        aria-label={label || restProps['aria-label']}
        className={clsx(
          'py-2 rounded-md focus:outline-none focus:shadow-outline border text-sm font-medium flex items-center justify-center space-x-2 transition-colors duration-300',
          iconOnlyButton ? 'px-2' : 'px-3',
          buttonType === ButtonType.primary
            ? 'bg-blue-600 text-white border-transparent primary'
            : buttonType === ButtonType.default
            ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white default bg-white'
            : buttonType === ButtonType.danger
            ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white danger'
            : 'border-transparent text-blue-600 link',
          className,
        )}
        style={style}
        {...restProps}
        ref={ref}
      >
        {icon}
        {label ? <span className="text-center">{label}</span> : null}
      </button>
    )
  },
)

ButtonComponent.displayName = 'Button'

export const Button = Object.assign(ButtonComponent, { ButtonType })
