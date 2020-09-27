import React, { useMemo } from 'react'
import { useSelect } from 'downshift'
import clsx from 'clsx'
import { CheckOutline, ChevronDownOutline } from 'components/icons'

export type optionType = {
  label: string
  value: string
  icon?: React.ReactNode
}
/** Select component properties */
export type SelectProps = {
  /** Options to render in dropdown */
  options: (optionType | string)[]
  /** Intial label in toggle button */
  placeholder: string
  /** Disable select component */
  disabled?: boolean
  /** The callback function that is trigered when an item is selected */
  onChange?: (value: string | optionType | null) => void
  /** Apply class to Select component */
  className?: string
}
export function Select({
  options,
  placeholder,
  disabled,
  onChange,
  className,
}: SelectProps) {
  const selectOptions = useMemo(() => {
    return options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option } as optionType
      } else {
        return option
      }
    })
  }, [options])

  const itemToString = (item: optionType | null) => (item ? item.label : '')

  // Using useSelect hook from downshift to handle logical part of Select
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: selectOptions, itemToString })

  return (
    <>
      <div className="relative inline-block">
        <button
          className={clsx(
            'flex px-3 py-2 items-center text-sm cursor-pointer justify-between overflow-hidden border rounded-md focus:shadow-outline focus:outline-none',
            disabled
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : 'text-gray-800',
            className,
          )}
          type="button"
          disabled={disabled}
          onChange={onChange?.(selectedItem)}
          {...getToggleButtonProps()}
        >
          {selectedItem ? itemToString(selectedItem) : placeholder}
          <ChevronDownOutline className="w-4 h-4" />
        </button>
        <ul
          className="w-full mt-1 overflow-y-auto text-sm rounded-md shadow focus:outline-none"
          {...getMenuProps()}
        >
          {isOpen &&
            selectOptions.map((item, index) => (
              <li
                className={clsx(
                  'px-3 py-2 flex items-center justify-between',
                  highlightedIndex === index
                    ? 'bg-blue-600 text-white'
                    : undefined,
                  selectedItem === item ? 'font-semibold' : undefined,
                )}
                key={`${item.label}${index}`}
                {...getItemProps({ item: item, index })}
              >
                <div className="flex items-center space-x-2">
                  <span>{item?.icon}</span>
                  <span>{item.label}</span>
                </div>

                {selectedItem === item ? (
                  <CheckOutline className="w-5 h-5" />
                ) : null}
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}
