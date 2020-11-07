import React from 'react'
import clsx from 'clsx'
import { CheckOutline } from 'components/icons'
import { OptionType } from '../types'

type SelectOptionProps = Omit<
  React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
  'children' | 'tabIndex'
> & {
  option: OptionType
  highlighted?: boolean
  selected?: boolean
}

export function SelectOption({
  option,
  highlighted,
  selected,
  className,
  style,
  ...restProps
}: SelectOptionProps) {
  return (
    <li
      className={clsx(
        'px-3 py-2 text-sm flex items-center space-x-3',
        highlighted ? 'bg-blue-500 text-white' : undefined,
        option.disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-75'
          : undefined,
        !highlighted && !option.disabled ? 'text-gray-700' : undefined,
        className,
      )}
      style={style}
      key={option.value}
      tabIndex={-1}
      role="option"
      {...restProps}
    >
      {option.icon}
      <span className="truncate whitespace-no-wrap">{option.label}</span>
      <span className="flex-1" />
      {selected ? <CheckOutline className="w-4 h-4" /> : null}
    </li>
  )
}
