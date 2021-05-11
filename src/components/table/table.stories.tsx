import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Table } from './table'

export default { title: 'Data Display/Table', component: Table } as Meta

export function BasicTable() {
  const dataSource = Array.from({ length: 7 }).map((_, i) => ({
    key: i.toString(),
    name: 'Bernard Lane',
    title: 'Director, Human Resources',
    email: 'bernardlane@example.com',
    role: 'Owner',
  }))

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ]

  return <Table dataSource={dataSource} columns={columns} />
}
