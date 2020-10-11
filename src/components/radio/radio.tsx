import React from 'react'
import clsx from 'clsx'
import { hideVisually } from 'polished'
import useSyncedState from 'hooks/use-synced-states'

export type RadioProps = {
  checked?: boolean
  defaultChecked?: boolean
  label?: string
  disabled?: boolean
}

export function Radio({
  checked = false,
  defaultChecked = false,
  label,
  disabled = false,
}: RadioProps) {
  const [checkedState, setCheckedState] = useSyncedState(
    checked || defaultChecked,
  )
  return (
    <label
      className={clsx(
        'flex items-center space-x-2',
        disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer',
      )}
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
        onChange={(event) => {
          setCheckedState(event.target.checked)
        }}
        disabled={disabled}
        style={hideVisually()}
      />
      {label ? <span className="text-sm">{label}</span> : null}
    </label>
  )
}
