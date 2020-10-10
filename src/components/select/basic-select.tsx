import React from 'react'
import { useSelect } from 'downshift'
import clsx from 'clsx'
import {
  CheckOutline,
  ChevronDownOutline,
  XCircleSolid,
} from 'components/icons'
import { OptionType } from './select'

/**
 * BasicSelect component properties
 */
export type BasicSelectProps = {
  /** Options to render in dropdown */
  options: OptionType[]
  /** Intial label in toggle button */
  placeholder?: string
  /** Define default selection for Select component */
  defaultValue?: string
  /** Disable select component */
  disabled?: boolean
  /** Show clear button to clear selection */
  allowClear?: boolean
  /** The callback function that is trigered when an item is selected */
  onChange?: ({
    selectedItem,
  }: {
    selectedItem: OptionType | undefined
  }) => void
  /** Apply class to Select component */
  className?: string
  /** Add style object for custom styling */
  style?: React.CSSProperties
}
export function BasicSelect({
  options,
  placeholder,
  defaultValue,
  disabled = false,
  allowClear = false,
  onChange,
  className,
  style,
}: BasicSelectProps) {
  const itemToString = (item: OptionType | null) => (item ? item.label : '')

  // Using useSelect hook from downshift to handle logical part of Select
  const {
    isOpen,
    selectedItem,
    selectItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect<OptionType>({
    items: options,
    itemToString,
    initialSelectedItem: options.find((item) => item.value === defaultValue),
    onSelectedItemChange: ({ selectedItem }) => {
      onChange?.({ selectedItem: selectedItem ?? undefined })
    },
  })

  return (
    <div className="inline-block">
      <div
        className={clsx(
          'flex px-3 py-2 group items-center text-sm cursor-pointer justify-between overflow-hidden border rounded-md focus:shadow-outline focus:outline-none',
          disabled
            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
            : 'text-gray-800',
          className,
        )}
        role="button"
        disabled={disabled}
        style={style}
        {...getToggleButtonProps()}
      >
        <div className="flex items-center gap-x-2">
          {selectedItem ? selectedItem.icon : null}
          {selectedItem ? itemToString(selectedItem) : placeholder}
        </div>
        {allowClear && selectedItem ? (
          <button
            className="opacity-0 focus:outline-none group-hover:opacity-100"
            data-testid="clear-button"
            onClick={(event) => {
              event.stopPropagation()
              // @ts-ignore: selectItem is not accepting null argument type
              selectItem(null)
            }}
          >
            <XCircleSolid className="w-5 h-5 text-gray-400" />
          </button>
        ) : null}
        <ChevronDownOutline
          className={clsx(
            'w-4 h-4',
            allowClear && selectedItem ? 'group-hover:hidden' : null,
          )}
        />
      </div>
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
  )
}
