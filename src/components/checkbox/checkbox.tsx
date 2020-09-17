import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { hideVisually } from 'polished'
import { CheckOutline } from 'components/icons'
import { CheckboxGroup } from './checkbox-group'
import { useSyncedState } from '../../hooks/useSyncedState'

/**
 * Checkbox properties
 */
export type CheckboxProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'checked' | 'disabled' | 'onChange' | 'className' | 'style'
> & {
  /** HTML checked attribute for input element to set input status true or false */
  checked?: boolean | 'indeterminate'
  /** Default checked property to intialize component */
  defaultChecked?: boolean | 'indeterminate'
  /** To show label on the right side of checkbox */
  label?: React.ReactNode
  /** Error property to render checkbox border and label text in red whenever error occurs */
  error?: boolean
  /** Use disbaled property to disable user input in checkbox */
  disabled?: boolean
  /** The callback function that is triggered when the state changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Additional class applied to checkbox */
  className?: string
  /** Styles property to apply on the entire Checkbox component */
  style?: React.CSSProperties
}

/** Checkbox component to render input type checkbox along with some other properties */
export const CheckboxComponent = forwardRef(
  (
    {
      checked,
      defaultChecked,
      label,
      error,
      disabled,
      onChange,
      className,
      style,
      ...restProps
    }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [checkedState, setCheckedState] = useSyncedState(
      checked || defaultChecked || false,
    )
    return (
      <label
        className={clsx(
          'group flex items-center space-x-2 checkbox',
          disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer',
          className,
        )}
        style={style}
      >
        <div
          className={clsx(
            'w-4 h-4 border rounded flex items-center justify-center text-white checkbox-icon-container',
            checkedState === true && !disabled
              ? 'bg-blue-500 border-blue-500'
              : undefined,
            disabled && !checkedState ? 'bg-gray-100' : undefined,
            disabled && checkedState ? 'bg-gray-300' : undefined,
            checkedState !== true && !disabled && !error
              ? 'group-hover:border-blue-500'
              : undefined,
            error ? 'border-red-500 error' : undefined,
          )}
        >
          {checkedState === true ? (
            <CheckOutline className="w-4 h-4" />
          ) : checkedState === 'indeterminate' ? (
            <div className="w-2 h-2 bg-blue-500" />
          ) : null}
        </div>
        <input
          type="checkbox"
          checked={!!checkedState}
          onChange={(event) => {
            setCheckedState(event.target.checked)
            if (onChange) {
              onChange(event)
            }
          }}
          disabled={disabled}
          style={hideVisually()}
          ref={ref}
          {...restProps}
        />
        {label ? (
          <span
            className={clsx('text-sm', error ? 'text-red-500' : undefined)}
            data-testid="label"
          >
            {label}
          </span>
        ) : null}
      </label>
    )
  },
)

CheckboxComponent.displayName = 'Checkbox'

export const Checkbox = Object.assign(CheckboxComponent, { CheckboxGroup })
