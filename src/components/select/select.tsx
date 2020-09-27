import React, { createContext, useContext, useState } from 'react'
import { CheckOutline, ChevronDownOutline } from 'components/icons'
import clsx from 'clsx'

const OptionContext = createContext<{
  showOptions: boolean
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
  selectedOption: string | undefined
  setSelectedOption: React.Dispatch<React.SetStateAction<string | undefined>>
}>({
  showOptions: false,
  setShowOptions: () => {},
  selectedOption: '',
  setSelectedOption: () => {},
})

/** Select component properties */
export type SelectProps = {
  defaultValue?: string
  children: React.ReactNode
  className?: string
}
export function Select({ defaultValue, children, className }: SelectProps) {
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    defaultValue,
  )

  return (
    <>
      <div className="relative inline-block">
        <button
          className={clsx(
            'flex px-3 py-2 items-center text-sm cursor-pointer text-gray-800 justify-between overflow-hidden border rounded-md focus:shadow-outline focus:outline-none',
            className,
          )}
          type="button"
          onClick={() => setShowOptions((prevState) => !prevState)}
        >
          {selectedOption}
          <ChevronDownOutline className="w-4 h-4" />
        </button>
        {showOptions ? (
          <>
            <div className="absolute w-full mt-1 overflow-y-auto text-sm rounded-md shadow">
              <OptionContext.Provider
                value={{
                  showOptions,
                  setShowOptions,
                  selectedOption,
                  setSelectedOption,
                }}
              >
                {children}
              </OptionContext.Provider>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

/** Option component properties */
export type OptionType = {
  value: string
  children: string
}

export function Option({ value, children }: OptionType) {
  const { setShowOptions, selectedOption, setSelectedOption } = useContext(
    OptionContext,
  )
  return (
    <button
      className={clsx(
        'w-full px-3 py-2 text-left flex items-center justify-between text-gray-800 focus:outline-none hover:bg-blue-600 hover:text-white',
        value === selectedOption ? 'font-bold' : undefined,
      )}
      onClick={() => {
        setSelectedOption(value)
        setShowOptions(false)
      }}
    >
      {children}
      {value === selectedOption ? <CheckOutline className="w-5 h-5" /> : null}
    </button>
  )
}
