import React, { forwardRef, useMemo, cloneElement } from 'react'
import clsx from 'clsx'
import { ButtonSpinner } from './button-spinner'

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
  children?: string
  /** icon rendered */
  icon?: JSX.Element
  /** placement of icon with respect to label, whether it should be before label or after label */
  iconPlacement?: 'afterText' | 'beforeText'
  /** type of the button */
  buttonType?: 'primary' | 'default' | 'danger' | 'link'
  /** show loading spinner in the button, if there is a icon present, it would render instead of the icon */
  loading?: boolean
  /** additional class applied to button */
  className?: string
  /** button styles */
  style?: React.CSSProperties
}

/**
 * Base component to render **button**.
 *
 * `Button` can be of type
 *
 *   * **primary** `primary` solid filled button (with primary background color), to be used for primary actions
 *   * **default** `default` bordered button (primary color) and text in primary color, to be used for secondary actions
 *   * **danger** `danger` bordered button with error color, to be used in case of presenting any delete action to user
 *   * **link** `link` button without any border, can be used to render menu icons where we don't want to show users any button border
 *
 *
 *  Generally the **icon** is placed before the button label. But that can also be changed, by configuring
 * `iconPlacement` prop to be
 *
 *  * `beforeText` rendering the button icon before the label
 *  * `afterText` rendering the button icon after the label
 */
export const Button = forwardRef(
  (
    {
      children,
      icon,
      iconPlacement = 'beforeText',
      buttonType = 'default',
      loading,
      disabled,
      className,
      style,
      ...restProps
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const iconOnlyButton = icon && !children

    const buttonClassNames = useMemo(() => {
      if (buttonType === 'default') {
        if (disabled) {
          return 'border-gray-400 text-gray-400 default'
        }
        return 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white default'
      }

      if (buttonType === 'primary') {
        if (disabled) {
          return 'bg-gray-400 text-white border-transparent primary'
        }

        return 'bg-blue-600 text-white border-transparent primary'
      }

      if (buttonType === 'danger') {
        if (disabled) {
          return 'border-gray-400 text-gray-400 danger'
        }

        return 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white danger'
      }

      // if none of the above branches are satisfied, then the button is of type link
      if (disabled) {
        return 'border-transparent text-gray-400 link'
      }
      return 'border-transparent text-blue-600 link'
    }, [buttonType, disabled])

    const iconComponent = loading ? (
      <ButtonSpinner />
    ) : icon ? (
      cloneElement(icon, { className: 'w-5 h-5' })
    ) : null

    return (
      <button
        aria-label={children || restProps['aria-label']}
        className={clsx(
          'py-2 rounded-md focus:outline-none focus:ring-2 border text-sm font-medium flex items-center justify-center space-x-2 transition-colors duration-300',
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
        {iconPlacement === 'beforeText' ? iconComponent : null}
        {children ? <span className="text-center">{children}</span> : null}
        {iconPlacement === 'afterText' ? iconComponent : null}
      </button>
    )
  },
)

Button.displayName = 'Button'
