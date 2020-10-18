import React from 'react'
export declare type OnChangeType = (page: number, pageSize: number) => void
/**
 * Pagination component properties
 */
export declare type PaginationProps = {
  /** Use current prop along with onChange
   * to create controlled Pagination component
   */
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
export declare function Pagination({
  current,
  defaultCurrent,
  total,
  pageRangeDisplayed,
  boundaryPageButtons,
  showSizeChanger,
  showQuickJumper,
  pageSizeOptions,
  onChange,
  className,
  style,
}: PaginationProps): JSX.Element
