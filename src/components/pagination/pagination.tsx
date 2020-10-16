import React, { useEffect, useState } from 'react'
import { range } from 'lodash-es'
import Button from 'components/button'
import Select from 'components/select'
import { ChevronLeftOutline, ChevronRightOutline } from '../icons'
import PageButton from './components/page-button'

/**
 * Pagination component properties
 */
export type PaginationProps = {
  /** Default initial page number */
  defaultCurrent?: number
  /** Total number of data items */
  total: number
  /** Determine whether to show pageSize select */
  showSizeChanger?: boolean
  /** Determine whether you can jump to pages directly */
  showQuickJumper?: boolean
}

/**
 * A long list can be divided into several pages using Pagination, and only one page will be loaded at a time.
 *
 * ### When To Use
 *
 * * When it will take a long time to load/render all items.
 * * If you want to browse the data by navigating through pages.
 */

export function Pagination({
  defaultCurrent = 1,
  total,
  showSizeChanger = false,
  showQuickJumper = false,
}: PaginationProps) {
  const [totalPages, setTotalPages] = useState(Math.ceil(total / 10))
  const [selected, setSelected] = useState(defaultCurrent)
  const [inputValue, setInputValue] = useState<string>('')

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

  function handleDecrement() {
    setSelected((prevState) => prevState - 1)
  }

  function handleIncrement() {
    setSelected((prevState) => prevState + 1)
  }

  function handlePageJump() {
    const jumpValue = parseFloat(inputValue ?? '')
    if (typeof jumpValue === 'number') {
      if (jumpValue < 1) {
        setSelected(1)
      } else if (jumpValue > totalPages) {
        setSelected(totalPages)
      } else {
        setSelected(jumpValue)
      }
    }
    setInputValue('')
  }

  return (
    <div className="flex items-center gap-x-2">
      {/* Previous Button */}
      <Button
        label="Previous"
        buttonType={Button.ButtonType.link}
        icon={<ChevronLeftOutline />}
        disabled={selected === 1}
        onClick={handleDecrement}
      />

      {totalPages < 8 ? (
        range(1, totalPages + 1).map((page) => (
          <PageButton
            key={page}
            page={page}
            selected={selected}
            onClick={() => setSelected(page)}
          />
        ))
      ) : (
        <>
          <PageButton
            page={1}
            selected={selected}
            onClick={() => setSelected(1)}
          />
          {selected > 4 ? (
            <>
              <span>...</span>
              {totalPages - selected < 3 ? (
                range(totalPages - 3, totalPages).map((page) => (
                  <PageButton
                    key={page}
                    page={page}
                    selected={selected}
                    onClick={() => setSelected(page)}
                  />
                ))
              ) : totalPages - selected === 3 ? (
                <>
                  {range(selected - 1, totalPages).map((page) => (
                    <PageButton
                      key={page}
                      page={page}
                      selected={selected}
                      onClick={() => setSelected(page)}
                    />
                  ))}
                </>
              ) : (
                <>
                  {range(selected - 1, selected + 2).map((page) => (
                    <PageButton
                      key={page}
                      page={page}
                      selected={selected}
                      onClick={() => setSelected(page)}
                    />
                  ))}
                  <span className="text-blue-600">...</span>
                </>
              )}
            </>
          ) : selected === 4 ? (
            <>
              {range(2, 6).map((page) => (
                <PageButton
                  key={page}
                  page={page}
                  selected={selected}
                  onClick={() => setSelected(page)}
                />
              ))}
              <span className="text-blue-600">...</span>
            </>
          ) : (
            <>
              {range(2, 5).map((page) => (
                <PageButton
                  key={page}
                  page={page}
                  selected={selected}
                  onClick={() => setSelected(page)}
                />
              ))}
              <span className="text-blue-600">...</span>
            </>
          )}
          <PageButton
            page={totalPages}
            selected={selected}
            onClick={() => setSelected(totalPages)}
          />
        </>
      )}

      {/* Next Button */}
      <Button
        label="Next"
        buttonType={Button.ButtonType.link}
        icon={<ChevronRightOutline />}
        iconPlacement={Button.IconPlacement.afterLabel}
        disabled={selected === totalPages}
        onClick={handleIncrement}
      />

      {showSizeChanger ? (
        <Select options={options} defaultValue="10" onChange={handlePageSize} />
      ) : null}

      {/* Input field helps to directly jump on another page */}
      {showQuickJumper ? (
        <div className="flex items-center text-sm gap-x-2">
          <span>Go to</span>
          <input
            className="w-16 px-3 py-1 border rounded-md focus:outline-none focus:shadow-outline"
            value={inputValue}
            onChange={(event) => {
              const newValue = event.target.value
              setInputValue(newValue)
            }}
            onBlur={handlePageJump}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handlePageJump()
              }
            }}
          />
        </div>
      ) : null}
    </div>
  )
}
