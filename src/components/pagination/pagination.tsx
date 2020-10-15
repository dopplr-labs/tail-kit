import React, { useEffect, useState } from 'react'
import { range } from 'lodash-es'
import Button from 'components/button'
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

  function handleDecrement() {
    setSelected((prevState) => prevState - 1)
  }

  function handleIncrement() {
    setSelected((prevState) => prevState + 1)
  }

  function PageButton({ page }: { page: number }) {
    return (
      <Button
        label={page.toString()}
        buttonType={
          selected === page ? Button.ButtonType.primary : Button.ButtonType.link
        }
        onClick={() => {
          setSelected(page)
        }}
      />
    )
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        label="Previous"
        buttonType={Button.ButtonType.link}
        icon={<ChevronLeftOutline />}
        disabled={selected === 1}
        onClick={handleDecrement}
      />
      {totalPages < 8 ? (
        range(1, totalPages + 1).map((page) => (
          <PageButton key={page} page={page} />
        ))
      ) : (
        <>
          <PageButton page={1} />
          {selected > 4 ? (
            <>
              <span>...</span>
              {totalPages - selected < 3 ? (
                range(totalPages - 3, totalPages).map((page) => (
                  <PageButton key={page} page={page} />
                ))
              ) : totalPages - selected === 3 ? (
                <>
                  {range(selected - 1, totalPages).map((page) => (
                    <PageButton key={page} page={page} />
                  ))}
                </>
              ) : (
                <>
                  {range(selected - 1, selected + 2).map((page) => (
                    <PageButton key={page} page={page} />
                  ))}
                  <span>...</span>
                </>
              )}
            </>
          ) : selected === 4 ? (
            <>
              {range(2, 6).map((page) => (
                <PageButton key={page} page={page} />
              ))}
              <span>...</span>
            </>
          ) : (
            <>
              {range(2, 5).map((page) => (
                <PageButton key={page} page={page} />
              ))}
              <span>...</span>
            </>
          )}
          <PageButton page={totalPages} />
        </>
      )}
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
    </div>
  )
}
