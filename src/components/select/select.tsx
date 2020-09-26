import React from 'react'
import { ChevronDownOutline } from 'components/icons'
import clsx from 'clsx'

export type SelectProps = {
  className?: string
}
export function Select({ className }: SelectProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between overflow-hidden border rounded-md focus-within:shadow-outline',
        className,
      )}
    >
      <select className="flex-1 px-3 py-2 focus:outline-none">
        <option>Hello</option>
      </select>
      <ChevronDownOutline className="w-4 h-4 mr-3" />
    </div>
  )
}
