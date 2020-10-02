import React, { useState, useMemo } from 'react'
import { useCombobox } from 'downshift'
import matchSorter from 'match-sorter'
import clsx from 'clsx'
import Input from 'components/input'
import { OptionType } from './select'

export type SearchSelectProps = {
  /** Options to render in dropdown */
  options: (OptionType | string)[]
  /** Intial label in select input field */
  placeholder: string
}
export function SearchSelect({ options, placeholder }: SearchSelectProps) {
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
      // creating array of labels after filteration using matchSorter
      const filteredArray = matchSorter(
        selectOptions.map((item) => item.label),
        inputValue ?? '',
      )
      // render filtered array in select dropdown
      setInputItems(
        selectOptions.filter((item) => filteredArray.indexOf(item.label) >= 0),
      )
    },
  })

  return (
    <div className="inline-block">
      <div {...getComboboxProps()}>
        <Input
          placeholder={placeholder}
          {...getInputProps()}
          {...getToggleButtonProps()}
        />
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
