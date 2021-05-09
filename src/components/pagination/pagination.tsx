import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import clsx from 'clsx'
import Button from 'components/button'
import Select from 'components/select'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import useSyncedState from 'hooks/use-synced-states'
import { Keys } from 'utils/keyboard'
import PageButton from './components/page-button'

export type OnChangeType = (page: number, pageSize: number) => void

/**
 * Pagination component properties
 */
export type PaginationProps = {
  /** Use current prop along with onChange to create controlled Pagination component */
  current?: number
  /** Default initial page number */
  defaultCurrent?: number
  /** Total number of data items */
  total: number
  /** Number of total PageButtons displayed together  */
  pageRangeDisplayed?: number
  /** Fixed number of buttons on both side of Pagination component */
  boundaryPageButtons?: number
  /** Determine whether to show pageSize select */
  showSizeChanger?: boolean
  /** Determine whether you can jump to pages directly */
  showQuickJumper?: boolean
  /** Specify the sizeChanger options */
  pageSizeOptions?: string[]
  /** Called when the page number is changed, and it takes the resulting page number and pageSize as its arguments */
  onChange?: OnChangeType
  /** Additional classes applied to the Pagination component */
  className?: string
  /** Additional styles applied to the Pagination component */
  style?: React.CSSProperties
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
  current,
  defaultCurrent = 1,
  total,
  pageRangeDisplayed = 5,
  boundaryPageButtons = 2,
  showSizeChanger = false,
  showQuickJumper = false,
  pageSizeOptions = ['10', '20', '50', '100'],
  onChange,
  className,
  style,
}: PaginationProps) {
  const [pageSize, setPageSize] = useSyncedState(pageSizeOptions[0])

  const [selected, setSelected] = useSyncedState<number>(
    current || defaultCurrent,
  )
  const [inputValue, setInputValue] = useState<string>('')

  // Using useRef hook to avoid multiple onChange invokes in useEffect
  const onChangeCb = useRef<OnChangeType | undefined>(undefined)
  onChangeCb.current = onChange

  const totalPages = Math.ceil(total / parseFloat(pageSize))

  // Options to be used with Select component
  const options = useMemo(() => {
    return pageSizeOptions.map((size) => {
      return { label: `${size} / page`, value: size }
    })
  }, [pageSizeOptions])

  /** After changing data per page if value of selected is greater than totalPages
   *  then selected will be equal to totalPages
   */
  useEffect(() => {
    if (selected > totalPages) {
      setSelected(totalPages)
    }
  }, [selected, totalPages, setSelected])

  /** Invoke onChange function everytime selected page or pageSize changes */
  useEffect(() => {
    const pageSizeValue = parseFloat(pageSize)
    onChangeCb.current?.(selected, pageSizeValue)
  }, [selected, pageSize])

  function handleDecrement() {
    setSelected((prevState) => prevState - 1)
  }

  function handleIncrement() {
    setSelected((prevState) => prevState + 1)
  }

  function handlePageSize(selectedOption: string | undefined) {
    setPageSize(selectedOption ?? pageSizeOptions[0])
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

  // Enter key shortcut used in pageJumper
  function handleEnterKeyPress(event: React.KeyboardEvent) {
    if (event.key === Keys.Enter) {
      handlePageJump()
    }
  }

  // function returns single PageButton component
  const createPageButton = useCallback(
    (page: number) => (
      <PageButton
        key={page}
        page={page}
        selected={selected}
        onClick={() => setSelected(page)}
      />
    ),
    [selected, setSelected],
  )

  const renderButtons = useMemo(() => {
    const items = []

    if (totalPages <= pageRangeDisplayed) {
      for (let page = 1; page <= totalPages; page++) {
        items.push(createPageButton(page))
      }
    } else {
      // Number of buttons to render on the left side of selected button
      let leftSide = pageRangeDisplayed / 2

      // Number of buttons to render on the right side of selected button
      let rightSide = pageRangeDisplayed - leftSide

      // If the selected page index is on the default right side of the pagination,
      // we consider that the new right side is made up of it (= only one break element).
      // If the selected page index is on the default left side of the pagination,
      // we consider that the new left side is made up of it (= only one break element).
      if (selected > totalPages - pageRangeDisplayed / 2) {
        rightSide = totalPages - selected
        leftSide = pageRangeDisplayed - rightSide
      } else if (selected < pageRangeDisplayed / 2) {
        leftSide = selected
        rightSide = pageRangeDisplayed - leftSide
      }

      let breakView

      for (let page = 1; page <= totalPages; page++) {
        // If the page index is lower than
        // the number of boundary buttons defined,
        // the page has to be displayed on the left side of
        // the pagination.
        if (page <= boundaryPageButtons) {
          items.push(createPageButton(page))
          continue
        }

        // If the page index is greater than the total pages
        // minus the number of boundary buttons defined,
        // the page has to be displayed on the right side of the pagination.
        if (page > totalPages - boundaryPageButtons) {
          items.push(createPageButton(page))
          continue
        }

        // If the page index is near the selected page index
        // and inside the defined range (pageRangeDisplayed)
        // we have to display it (it will create the center
        // part of the pagination).
        if (page >= selected - leftSide && page <= selected + rightSide) {
          items.push(createPageButton(page))
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
  }, [
    totalPages,
    createPageButton,
    selected,
    boundaryPageButtons,
    pageRangeDisplayed,
  ])

  return (
    <div className={clsx('flex items-center gap-x-2', className)} style={style}>
      <Button
        label="Previous"
        buttonType={Button.ButtonType.link}
        icon={<HiOutlineChevronLeft />}
        disabled={selected === 1}
        onClick={handleDecrement}
      />
      {renderButtons}
      <Button
        label="Next"
        buttonType={Button.ButtonType.link}
        icon={<HiOutlineChevronRight />}
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
            className="w-16 px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
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
