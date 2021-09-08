import React, { forwardRef } from 'react'
import clsx from 'clsx'
import useSyncedState from '../../hooks/use-synced-states'

/**
 * Switch properties
 */
export type SwitchProps = {
  /** whether the switch is on on | off state */
  checked?: boolean
  /** Property to initialize switch with a particular value */
  defaultChecked?: boolean
  /** Disable switch */
  disabled?: boolean
  /** function called when the state of switch is changed */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /** additional class names */
  className?: string
  /** addtional styles */
  style?: React.CSSProperties
}

/**
 * Switch component to render toggle
 */
export const Switch = forwardRef(
  (
    {
      checked,
      defaultChecked,
      disabled,
      onChange,
      className,
      style,
    }: SwitchProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [checkedState, setCheckedState] = useSyncedState(
      (checked || defaultChecked) ?? false,
    )
    return (
      <label
        className={clsx(
          'relative inline-block w-10 rounded-full h-5 transition-all duration-300 focus-within:shadow-outline',
          checkedState ? 'bg-blue-500' : 'bg-gray-300',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          className,
        )}
        style={style}
      >
        <div
          className={clsx(
            'w-5 h-5 rounded-full bg-white shadow transition duration-150',
          )}
          style={{
            transform: `translate(${checkedState ? 20 : 0}px)`,
          }}
          data-testid="toggle-thumb"
        />
        <input
          className="sr-only"
          checked={checkedState}
          onChange={(event) => {
            setCheckedState(event.target.checked)
            if (onChange) {
              onChange(event)
            }
          }}
          type="checkbox"
          disabled={disabled}
          ref={ref}
        />
      </label>
    )
  },
)

Switch.displayName = 'Switch'
