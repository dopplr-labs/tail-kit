import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
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
