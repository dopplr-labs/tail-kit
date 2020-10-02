import React, { useMemo, useState } from 'react'
import { useCombobox, useMultipleSelection } from 'downshift'
import clsx from 'clsx'
import { XOutline } from 'components/icons'
import matchSorter from 'match-sorter'
import { OptionType } from './select'

export type MultiSelectProps = {
  /** Options to render in dropdown */
  options: (OptionType | string)[]
  /** Intial label in select input field */
  placeholder?: string
  /** default selections for Select component */
  defaultValue?: string[]
  /** Apply class to Select component */
  className?: string
}

export function MultiSelect({
  options,
  defaultValue = [],
  placeholder,
  className,
}: MultiSelectProps) {
  const selectOptions = useMemo(() => {
    return options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option } as OptionType
      } else {
        return option
      }
    })
  }, [options])

  const [inputValue, setInputValue] = useState<string | undefined>('')

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: defaultValue })

  const filteredItems = useMemo(() => {
    // remove already selected items from array
    const unselectedItems = selectOptions.filter(
      (item) => selectedItems.indexOf(item.label) < 0,
    )
    // search based on user input using matchSorter
    return matchSorter(unselectedItems, inputValue ?? '', { keys: ['label'] })
  }, [inputValue, selectOptions, selectedItems])

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getToggleButtonProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    inputValue,
    items: filteredItems,
    selectedItem: null,
    defaultHighlightedIndex: 0,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          }
      }
      return changes
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue)
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue('')
            addSelectedItem(selectedItem.label)
          }
          break
        default:
          break
      }
    },
  })
  return (
    <div className="inline-block">
      <div
        className={clsx(
          'px-3 py-2 border rounded-md focus-within:shadow-outline',
          className,
        )}
      >
        <div className="flex flex-wrap items-center -m-1">
          {selectedItems.map((selectedItem, index) => (
            <div
              className="flex items-center px-2 m-1 text-sm text-blue-700 bg-blue-100 rounded-md gap-x-2 focus:outline-none"
              key={`selected-item-${index}`}
              {...getSelectedItemProps({ selectedItem, index })}
            >
              {selectedItem}
              <button
                className="focus:outline-none"
                onClick={() => {
                  removeSelectedItem(selectedItem)
                }}
              >
                <XOutline className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="flex-1 min-w-0" {...getComboboxProps()}>
            <input
              placeholder={selectedItems.length === 0 ? placeholder : ''}
              className="w-full m-1 text-sm focus:outline-none"
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
              {...getToggleButtonProps()}
            />
          </div>
        </div>
      </div>
      <ul
        className="w-full mt-1 overflow-y-auto text-sm rounded-md shadow focus:outline-none"
        {...getMenuProps()}
      >
        {isOpen &&
          filteredItems.map((item, index) => (
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
