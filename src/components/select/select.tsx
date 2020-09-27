import React from 'react'
import { useSelect } from 'downshift'
import clsx from 'clsx'
import { CheckOutline, ChevronDownOutline } from 'components/icons'

/** Select component properties */
export type SelectProps = {
  /** Options to render in dropdown */
  options: Array<string>
  /** Intial label in toggle button */
  label: string
  /** Apply class to Select component */
  className?: string
}
export function Select({ options, label, className }: SelectProps) {
  // Using useSelect hook from downshift to handle logical part of Select
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items: options })

  return (
    <>
      <div className="relative inline-block">
        <button
          className={clsx(
            'flex px-3 py-2 items-center text-sm cursor-pointer text-gray-800 justify-between overflow-hidden border rounded-md focus:shadow-outline focus:outline-none',
            className,
          )}
          type="button"
          {...getToggleButtonProps()}
        >
          {selectedItem ?? label}
          <ChevronDownOutline className="w-4 h-4" />
        </button>
        <ul
          className="w-full mt-1 overflow-y-auto text-sm rounded-md shadow focus:outline-none"
          {...getMenuProps()}
        >
          {isOpen &&
            options.map((item, index) => (
              <li
                className={clsx(
                  'px-3 py-2 flex items-center justify-between',
                  highlightedIndex === index
                    ? 'bg-blue-600 text-white'
                    : undefined,
                  selectedItem === item ? 'font-semibold' : undefined,
                )}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item}
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
