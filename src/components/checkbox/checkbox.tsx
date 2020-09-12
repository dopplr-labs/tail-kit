import React from 'react'
import clsx from 'clsx'
import { hideVisually } from 'polished'
import { CheckOutline } from 'components/icons'
import { CheckboxGroup } from './checkbox-group'

/**
 * Checkbox properties
 */
export type CheckboxProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'checked' | 'disabled' | 'className' | 'style'
> & {
  /** HTML checked attribute for input element to set input status true or false */
  checked?: boolean
  /** To show label on the right side of checkbox */
  label?: React.ReactNode
  /** Error property to render checkbox border and label text in red whenever error occurs */
  error?: boolean
  /** Use disbaled property to disable user input in checkbox */
  disabled?: boolean
  indeterminate?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Additional class applied to checkbox */
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
  indeterminate,
  onChange,
  className,
  style,
  ...restProps
}: CheckboxProps) {
  return (
    <label
      className={clsx(
        'inline-flex items-center space-x-2',
        disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer',
        className,
      )}
      style={style}
    >
      <div
        className={clsx(
          'w-4 h-4 form-checkbox flex items-center justify-center text-white focus:shadow-outline',
          checked && !disabled ? 'bg-blue-500' : undefined,
          disabled && !checked ? 'bg-gray-100' : undefined,
          disabled && checked ? 'bg-gray-300' : undefined,
          error ? 'border-red-500' : undefined,
        )}
      >
        {checked ? (
          <CheckOutline className="w-4 h-4" />
        ) : indeterminate ? (
          <div className="w-2 h-2 bg-blue-500" />
        ) : null}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={hideVisually()}
        {...restProps}
      />
      {label ? (
        <span className={clsx('text-sm', error ? 'text-red-500' : undefined)}>
          {label}
        </span>
      ) : null}
    </label>
  )
}

Checkbox.Group = CheckboxGroup
