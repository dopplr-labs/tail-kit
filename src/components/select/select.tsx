import React, { createContext, useContext, useState } from 'react'
import { ChevronDownOutline } from 'components/icons'
import clsx from 'clsx'

const OptionContext = createContext<{
  showOptions: boolean
  setShowOptions: React.Dispatch<React.SetStateAction<boolean>>
}>({
  showOptions: false,
  setShowOptions: () => {},
})

export type SelectProps = {
  defaultValue?: string
  children: React.ReactNode
  className?: string
}
export function Select({ defaultValue, children, className }: SelectProps) {
  const [showOptions, setShowOptions] = useState(false)

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
          {defaultValue}
          <ChevronDownOutline className="w-4 h-4" />
        </button>
        {showOptions ? (
          <>
            <div className="absolute w-full mt-1 overflow-y-auto text-sm rounded-md shadow">
              <OptionContext.Provider value={{ showOptions, setShowOptions }}>
                {children}
              </OptionContext.Provider>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export type OptionType = {
  children: React.ReactNode
}

export function Option({ children }: OptionType) {
  const { setShowOptions } = useContext(OptionContext)
  return (
    <button
      className="w-full px-2 py-1 text-left focus:outline-none hover:bg-blue-600 hover:text-white"
      onClick={() => setShowOptions(false)}
    >
      {children}
    </button>
  )
}
