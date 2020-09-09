import React from 'react'
import clsx from 'clsx'

/**
 * Checkbox properties
 */
export type CheckboxProps = {
  /** HTML checked attribute for input element to set input status true or false */
  checked?: boolean
  /** To show label on the right side of checkbox */
  label?: React.ReactNode
  /** error property to render checkbox border and label text in red whenever error occurs */
  error?: boolean
  disabled?: boolean
  /** additional class applied to checkbox label */
  className?: string
  /** Styles property to apply on the entire Checkbox component */
  style?: React.CSSProperties
}

/** Checkbox component to render input type checkbox along with some other properties */
export function Checkbox({
  checked,
  label,
  error,
  disabled,
  className,
  style,
  ...restProps
}: CheckboxProps) {
  return (
    <label
      className={clsx(
        'inline-flex items-center space-x-2',
        disabled ? 'cursor-not-allowed text-gray-400' : undefined,
      )}
      style={style}
    >
      <input
        type="checkbox"
        checked={checked}
        className={clsx(
          'w-4 h-4 form-checkbox',
          error ? 'border-red-500' : undefined,
          disabled ? 'cursor-not-allowed' : undefined,
        )}
        disabled={disabled}
        {...restProps}
      />
      {label ? (
        <span
          className={clsx(
            'text-sm',
            error ? 'text-red-500' : undefined,
            className,
          )}
        >
          {label}
        </span>
      ) : null}
    </label>
  )
}
