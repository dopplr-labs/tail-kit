import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { hideVisually } from 'polished'
import useSyncedState from 'hooks/use-synced-states'
import { RadioGroup } from 'components/radio/radio-group'

/**
 * Radio properties
 */
export type RadioProps = {
  /** HTML checked attribute for input element to set input status true or false */
  checked?: boolean
  /** Default checked property to initialize component */
  defaultChecked?: boolean
  /** To show label on the right side of radio */
  label?: string
  /** HTML value attribute for input element */
  value?: string | number
  /** Use disabled property to disable user input in radio */
  disabled?: boolean
  /** The callback function that is triggered when the state changes */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** Additional class applied to radio */
  className?: string
  /** Styles property to apply on the entire Radio component */
  style?: React.CSSProperties
}

export const RadioComponent = forwardRef(
  (
    {
      checked = false,
      defaultChecked = false,
      label,
      value,
      disabled = false,
      onChange,
      className,
      style,
    }: RadioProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [checkedState, setCheckedState] = useSyncedState(
      checked || defaultChecked,
    )
    return (
      <label
        className={clsx(
          'flex items-center space-x-2',
          disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer',
          className,
        )}
        style={style}
      >
        <div
          className={clsx(
            'flex items-center justify-center w-4 h-4 border rounded-full ',
            checkedState && !disabled ? 'border-blue-500' : undefined,
            checkedState && disabled ? 'border-gray-400' : undefined,
            !checkedState && !disabled ? 'hover:border-blue-500' : undefined,
          )}
        >
          {checkedState ? (
            <div
              className={clsx(
                'w-2 h-2 rounded-full',
                disabled ? 'bg-gray-400' : 'bg-blue-500',
              )}
            />
          ) : null}
        </div>
        <input
          type="radio"
          checked={checkedState}
          value={value}
          onChange={(event) => {
            setCheckedState(event.target.checked)
            onChange?.(event)
          }}
          disabled={disabled}
          style={hideVisually()}
          ref={ref}
        />
        {label ? (
          <span className="text-sm" data-testid="label">
            {label}
          </span>
        ) : null}
      </label>
    )
  },
)

RadioComponent.displayName = 'Radio'

export const Radio = Object.assign(RadioComponent, { RadioGroup })
