import React from 'react'
import clsx from 'clsx'

enum ButtonType {
  primary = 'primary',
  default = 'default',
  danger = 'danger',
  link = 'link',
}

type Props = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'children'
> & {
  label?: string
  icon?: JSX.Element
  buttonType?: ButtonType
  className?: string
  style?: React.CSSProperties
}

export default function Button({
  label,
  icon,
  buttonType = ButtonType.default,
  className,
  style,
  ...restProps
}: Props) {
  return (
    <button
      aria-label={label || restProps['aria-label']}
      className={clsx(
        'p-3 rounded-md focus:outline-none focus:shadow-outline border text-sm font-medium flex items-center space-x-2 transition-colors duration-300',
        buttonType === ButtonType.primary
          ? 'bg-blue-600 text-white border-transparent'
          : buttonType === ButtonType.default
          ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
          : buttonType === ButtonType.danger
          ? 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
          : '',
        className,
      )}
      style={style}
      {...restProps}
    >
      {icon}
      {label ? <span className="text-center">{label}</span> : null}
    </button>
  )
}

Button.ButtonType = ButtonType
