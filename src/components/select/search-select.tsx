import React, { useState } from 'react'
import { useCombobox } from 'downshift'
import matchSorter from 'match-sorter'
import clsx from 'clsx'
import Input from 'components/input'

export type SearchSelectProps = {
  options: string[]
  placeholder: string
}
export function SearchSelect({ options, placeholder }: SearchSelectProps) {
  const [inputItems, setInputItems] = useState(options)
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
    onInputValueChange: ({ inputValue }) => {
      setInputItems(matchSorter(options, inputValue ?? ''))
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
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}
