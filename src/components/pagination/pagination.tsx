import React, { useCallback, useEffect, useState, useMemo } from 'react'
import clsx from 'clsx'
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
  /** Specify the sizeChanger options */
  pageSizeOptions?: string[]
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
  pageSizeOptions = ['10', '20', '50', '100'],
}: PaginationProps) {
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(total / parseFloat(pageSizeOptions[0])),
  )
  const [selected, setSelected] = useState<number>(defaultCurrent)
  const [inputValue, setInputValue] = useState<string>('')

  const options = useMemo(() => {
    return pageSizeOptions.map((size) => {
      return { label: `${size} / page`, value: size }
    })
  }, [pageSizeOptions])

  useEffect(() => {
    if (selected > totalPages) {
      setSelected(totalPages)
    }
  }, [selected, totalPages])

  function handlePageSize(selectedOption: string | undefined) {
    const newPageSize = parseFloat(selectedOption ?? pageSizeOptions[0])
    setTotalPages(Math.ceil(total / newPageSize))
  }

  function handleDecrement() {
    setSelected((prevState) => prevState - 1)
  }

  function handleIncrement() {
    setSelected((prevState) => prevState + 1)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setInputValue(newValue)
  }

  function handlePageJump() {
    const jumpValue = parseFloat(inputValue)
    if (!isNaN(jumpValue) && typeof jumpValue === 'number') {
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

  function handleEnterKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handlePageJump()
    }
  }

  const firstPageButton = (
    <PageButton page={1} selected={selected} onClick={() => setSelected(1)} />
  )

  const renderButtons = useCallback(
    (x, y) => {
      return range(x, y).map((page) => (
        <PageButton
          key={page}
          page={page}
          selected={selected}
          onClick={() => setSelected(page)}
        />
      ))
    },
    [selected],
  )

  const lastPageButton = (
    <PageButton
      page={totalPages}
      selected={selected}
      onClick={() => setSelected(totalPages)}
    />
  )

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
        renderButtons(1, totalPages + 1)
      ) : (
        <>
          {firstPageButton}
          <span
            className={clsx(
              'text-blue-600',
              selected > 4 ? 'inline' : 'hidden',
            )}
          >
            ...
          </span>
          {selected < 4
            ? renderButtons(2, 5)
            : selected === 4
            ? renderButtons(2, 6)
            : totalPages - selected < 3
            ? renderButtons(totalPages - 3, totalPages)
            : totalPages - selected === 3
            ? renderButtons(totalPages - 4, totalPages)
            : renderButtons(selected - 1, selected + 2)}
          <span
            className={clsx(
              'text-blue-600',
              totalPages - selected > 3 ? 'inline' : 'hidden',
            )}
          >
            ...
          </span>
          {lastPageButton}
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

      {/* Select component to change number of data to render in a page */}
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
            onChange={handleChange}
            onBlur={handlePageJump}
            onKeyDown={handleEnterKeyPress}
          />
        </div>
      ) : null}
    </div>
  )
}
