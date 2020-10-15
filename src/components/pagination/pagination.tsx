import React, { useEffect, useState } from 'react'
import { range } from 'lodash-es'
import clsx from 'clsx'
import Select from 'components/select'
import { ChevronLeftOutline, ChevronRightOutline } from '../icons'

/**
 * Pagination component propertie
 */
export type PaginationProps = {
  /** Default initial page number */
  defaultCurrent?: number
  /** Total number of data items */
  total: number
  /** Determine whether to show pageSize select */
  showSizeChanger?: boolean
}

export default function Pagination({
  defaultCurrent = 1,
  total,
  showSizeChanger = false,
}: PaginationProps) {
  const [totalPages, setTotalPages] = useState(Math.ceil(total / 10))
  const [selected, setSelected] = useState(defaultCurrent)

  const options = [
    { label: '10 / page', value: '10' },
    { label: '20 / page', value: '20' },
    { label: '50 / page', value: '50' },
    { label: '100 / page', value: '100' },
  ]

  useEffect(() => {
    if (selected > totalPages) {
      setSelected(totalPages)
    }
  }, [selected, totalPages])

  function handlePageSize(selectedOption: string | undefined) {
    const newPageSize = parseFloat(selectedOption ?? '10')
    setTotalPages(Math.ceil(total / newPageSize))
  }

  return (
    <div className="flex items-center gap-x-2">
      <button
        className="flex items-center px-3 py-2 text-sm text-blue-700 border border-transparent rounded-md gap-x-1 hover:border-gray-300 focus:outline-none focus:shadow-outline"
        disabled={selected === 1}
        onClick={() => {
          setSelected((prevState) => prevState - 1)
        }}
      >
        <ChevronLeftOutline className="w-4 h-4" />
        Previous
      </button>
      {range(1, totalPages + 1).map((page) => (
        <button
          key={page}
          value={page}
          className={clsx(
            'px-3 py-1 text-sm rounded-md border border-transparent focus:outline-none',
            selected === page
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-gray-800 hover:border-gray-200',
          )}
          onClick={() => {
            setSelected(page)
          }}
        >
          {page}
        </button>
      ))}
      <button
        className="flex items-center px-3 py-2 text-sm text-blue-700 border border-transparent rounded-md gap-x-1 hover:border-gray-300 focus:outline-none focus:shadow-outline"
        onClick={() => {
          setSelected((prevState) => prevState + 1)
        }}
        disabled={selected === totalPages}
      >
        Next
        <ChevronRightOutline className="w-4 h-4" />
      </button>
      {showSizeChanger ? (
        <Select options={options} defaultValue="10" onChange={handlePageSize} />
      ) : null}
    </div>
  )
}
