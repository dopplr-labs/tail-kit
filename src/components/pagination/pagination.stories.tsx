import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Pagination } from './pagination'

export default {
  title: 'Navigation/Pagination',
  component: Pagination,
} as Meta

export function DefaultPagination() {
  return <Pagination total={50} defaultCurrent={3} />
}

export function WithSizeChanger() {
  return <Pagination total={100} defaultCurrent={3} showSizeChanger />
}

export function WithPageJumper() {
  return <Pagination total={500} showQuickJumper />
}

export function ControlledPagination() {
  const [current, setCurrent] = useState(3)
  return (
    <div className="flex flex-col items-start gap-y-4">
      <span className="ml-4 text-sm text-gray-800">
        Selected Page: <b>{current}</b>
      </span>
      <Pagination
        total={500}
        current={current}
        onChange={(page, pageSize) => {
          setCurrent(page)
          action('update')({ page, pageSize })
        }}
        showSizeChanger
      />
    </div>
  )
}
