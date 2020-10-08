import React, { useState, useMemo } from 'react'
import { useCombobox } from 'downshift'
import matchSorter from 'match-sorter'
import clsx from 'clsx'
import { XCircleSolid } from 'components/icons'
import { OptionType } from './select'

export type SearchSelectProps = {
  /** Options to render in dropdown */
  options: (OptionType | string)[]
  /** Intial label in select input field */
  placeholder?: string
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
export function SearchSelect({
  options,
  placeholder,
  disabled = false,
  allowClear = false,
  onChange,
  className,
  style,
}: SearchSelectProps) {
  const selectOptions = useMemo(() => {
    return options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option } as OptionType
      } else {
        return option
      }
    })
  }, [options])

  const [inputItems, setInputItems] = useState(selectOptions)

  const itemToString = (item: OptionType | null) => (item ? item.label : '')

  const {
    isOpen,
    selectItem,
    selectedItem,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      // render filtered result in select dropdown based on user input using matchSorter
      setInputItems(
        matchSorter(selectOptions, inputValue ?? '', { keys: ['label'] }),
      )
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onChange?.({ selectedItem: selectedItem ?? undefined })
    },
  })

  return (
    <div className="inline-block">
      <div
        className={clsx(
          'group px-3 py-2 focus-within:shadow-outline rounded-md border flex items-center gap-x-2',
          disabled ? 'cursor-not-allowed bg-gray-100' : undefined,
          className,
        )}
        style={style}
        {...getComboboxProps()}
      >
        {selectedItem ? selectedItem.icon : null }
        <input
          placeholder={placeholder}
          className={clsx(
            'flex-1 min-w-0 font-sans text-sm text-gray-800 placeholder-gray-400 focus:outline-none',
            disabled ? 'cursor-not-allowed bg-gray-100' : undefined,
          )}
          disabled={disabled}
          {...getInputProps()}
          {...getToggleButtonProps()}
        />
        {allowClear && !disabled && selectedItem ? (
          <button
            className="opacity-0 focus:outline-none group-hover:opacity-100"
            onClick={(event) => {
              event.stopPropagation()
              // @ts-ignore: selectItem is not accepting null argument type
              selectItem(null)
            }}
          >
            <XCircleSolid className="w-4 h-4 text-gray-400" />
          </button>
        ) : null}
      </div>
      <ul
        className="w-full mt-1 overflow-y-auto text-sm rounded-md shadow focus:outline-none"
        {...getMenuProps()}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className={clsx(
                'px-3 py-2 flex items-center justify-between',
                highlightedIndex === index
                  ? 'bg-blue-600 text-white'
                  : undefined,
              )}
              key={`${item.label}${index}`}
              {...getItemProps({ item, index })}
            >
              <div className="flex items-center space-x-2">
                <span>{item?.icon}</span>
                <span>{item.label}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
