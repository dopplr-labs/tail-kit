import React, { useState, useMemo, useEffect, useCallback } from 'react'
import Button from 'components/button'
import Select from 'components/select'
import { ChevronLeftOutline, ChevronRightOutline } from 'components/icons'
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

  function handleDecrement() {
    setSelected((prevState) => prevState - 1)
  }

  function handleIncrement() {
    setSelected((prevState) => prevState + 1)
  }

  function handlePageSize(selectedOption: string | undefined) {
    const newPageSize = parseFloat(selectedOption ?? pageSizeOptions[0])
    setTotalPages(Math.ceil(total / newPageSize))
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

  const createPageView = useCallback(
    (page: number) => (
      <PageButton
        key={page}
        page={page}
        selected={selected}
        onClick={() => setSelected(page)}
      />
    ),
    [selected],
  )

  const MARGIN_PAGES_DISPLAYED = 2
  const PAGE_RANGE_DISPLAYED = 5

  const renderButtons = useMemo(() => {
    const items = []

    if (totalPages <= PAGE_RANGE_DISPLAYED) {
      for (let page = 1; page <= totalPages; page++) {
        items.push(createPageView(page))
      }
    } else {
      let leftSide = PAGE_RANGE_DISPLAYED / 2
      let rightSide = PAGE_RANGE_DISPLAYED - leftSide

      // If the selected page index is on the default right side of the pagination,
      // we consider that the new right side is made up of it (= only one break element).
      // If the selected page index is on the default left side of the pagination,
      // we consider that the new left side is made up of it (= only one break element).
      if (selected > totalPages - PAGE_RANGE_DISPLAYED / 2) {
        rightSide = totalPages - selected
        leftSide = PAGE_RANGE_DISPLAYED - rightSide
      } else if (selected < PAGE_RANGE_DISPLAYED / 2) {
        leftSide = selected
        rightSide = PAGE_RANGE_DISPLAYED - leftSide
      }

      let breakView

      for (let page = 1; page <= totalPages; page++) {
        // If the page index is lower than the margin defined,
        // the page has to be displayed on the left side of
        // the pagination.
        if (page <= MARGIN_PAGES_DISPLAYED) {
          items.push(createPageView(page))
          continue
        }

        // If the page index is greater than the page count
        // minus the margin defined, the page has to be
        // displayed on the right side of the pagination.
        if (page > totalPages - MARGIN_PAGES_DISPLAYED) {
          items.push(createPageView(page))
          continue
        }

        // If the page index is near the selected page index
        // and inside the defined range (PAGE_RANDE_DISPLAYED)
        // we have to display it (it will create the center
        // part of the pagination).
        if (page >= selected - leftSide && page <= selected + rightSide) {
          items.push(createPageView(page))
          continue
        }

        // If the page index doesn't meet any of the conditions above,
        // we check if the last item of the current "items" array
        // is a break element. If not, we add a break element, else,
        // we do nothing (because we don't want to display the page).
        if (items[items.length - 1] !== breakView) {
          breakView = (
            <span key={page} className="text-blue-600">
              ...
            </span>
          )
          items.push(breakView)
        }
      }
    }
    return items
  }, [totalPages, createPageView, selected])

  return (
    <div className="flex items-center gap-x-2">
      <Button
        label="Previous"
        buttonType={Button.ButtonType.link}
        icon={<ChevronLeftOutline />}
        disabled={selected === 1}
        onClick={handleDecrement}
      />
      {renderButtons}
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
