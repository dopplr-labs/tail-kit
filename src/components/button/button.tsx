import React, { forwardRef, useMemo, cloneElement } from 'react'
import clsx from 'clsx'

export enum ButtonType {
  primary = 'primary',
  default = 'default',
  danger = 'danger',
  link = 'link',
}

export enum IconPlacement {
  afterLabel = 'afterLabel',
  beforeLabel = 'beforeLabel',
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
  /** placement of icon with respect to label, whether it should be before label or after label */
  iconPlacement?: IconPlacement
  /** type of the button */
  buttonType?: ButtonType
  /** show loading spinner in the button, if there is a icon present, it would render instead of the icon */
  loading?: boolean
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
      iconPlacement = IconPlacement.beforeLabel,
      buttonType = ButtonType.default,
      loading,
      disabled,
      className,
      style,
      ...restProps
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const iconOnlyButton = icon && !label

    const buttonClassNames = useMemo(() => {
      if (buttonType === ButtonType.default) {
        if (disabled) {
          return 'border-gray-400 text-gray-400 default'
        }
        return 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white default'
      }

      if (buttonType === ButtonType.primary) {
        if (disabled) {
          return 'bg-gray-400 text-white border-transparent primary'
        }

        return 'bg-blue-600 text-white border-transparent primary'
      }

      if (buttonType === ButtonType.danger) {
        if (disabled) {
          return 'border-gray-400 text-gray-400 danger'
        }

        return 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white danger'
      }

      if (buttonType === ButtonType.link) {
        if (disabled) {
          return 'border-transparent text-gray-400 link'
        }
        return 'border-transparent text-blue-600 link'
      }

      return undefined
    }, [buttonType, disabled])

    const iconComponent = loading ? (
      <ButtonSpinner />
    ) : icon ? (
      cloneElement(icon, { className: 'w-5 h-5' })
    ) : null

    return (
      <button
        aria-label={label || restProps['aria-label']}
        className={clsx(
          'py-2 rounded-md focus:outline-none focus:shadow-outline border text-sm font-medium flex items-center justify-center space-x-2 transition-colors duration-300',
          iconOnlyButton ? 'px-2' : 'px-3',
          buttonClassNames,
          disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer',
          className,
        )}
        style={style}
        disabled={disabled || loading}
        {...restProps}
        ref={ref}
      >
        {iconPlacement === IconPlacement.beforeLabel ? iconComponent : null}
        {label ? <span className="text-center">{label}</span> : null}
        {iconPlacement === IconPlacement.afterLabel ? iconComponent : null}
      </button>
    )
  },
)

ButtonComponent.displayName = 'Button'

export const Button = Object.assign(ButtonComponent, {
  ButtonType,
  IconPlacement,
})

export type ButtonSpinnerProps = {
  /** additional class names */
  className?: string
  /** additional styles */
  style?: React.CSSProperties
}

export function ButtonSpinner({ className, style }: ButtonSpinnerProps) {
  return (
    <svg
      className={clsx('w-5 h-5 animate-spin', className)}
      style={style}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
