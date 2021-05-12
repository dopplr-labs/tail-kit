import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Table } from './table'

export default { title: 'Data Display/Table', component: Table } as Meta

export function BasicTable() {
  const dataSource = Array.from({ length: 45 }).map((_, i) => ({
    key: i.toString(),
    name: `Bernard Lane ${i}`,
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

export function CustomCells() {
  const columns = [
    {
      key: '1',
      title: 'Name',
      dataIndex: 'name',
      // eslint-disable-next-line react/display-name
      render: (person: any) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img className="w-10 h-10 rounded-full" src={person.image} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {person.fullname}
            </div>
            <div className="text-sm text-gray-500">{person.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      title: 'Title',
      dataIndex: 'title',
      // eslint-disable-next-line react/display-name
      render: (title: any) => (
        <>
          <div className="text-sm font-medium text-gray-900">{title[0]}</div>
          <div className="text-sm text-gray-500">{title[1]}</div>
        </>
      ),
    },
    {
      key: '3',
      title: 'Status',
      dataIndex: 'status',
      // eslint-disable-next-line react/display-name
      render: (status: string) => (
        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          {status}
        </span>
      ),
    },
    { key: '4', title: 'Role', dataIndex: 'role' },
    {
      key: '5',
      title: '',
      dataIndex: 'actions',
      // eslint-disable-next-line react/display-name
      render: () => (
        <a
          href="#"
          className="font-semibold text-indigo-600 hover:text-indigo-900"
        >
          Edit
        </a>
      ),
    },
  ]

  const dataSource = [
    {
      key: '1',
      name: {
        fullname: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      title: ['Regional Paradigm Technician', 'Optimization'],
      status: 'Active',
      role: 'Admin',
    },
    {
      key: '2',
      name: {
        fullname: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        image:
          'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      title: ['Product Directives Officer', 'Intranet'],
      status: 'Active',
      role: 'Owner',
    },
    {
      key: '3',
      name: {
        fullname: 'Esther Howard',
        email: 'esther.howard@example.com',
        image:
          'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      title: ['Forward Response Developer', 'Directives'],
      status: 'Active',
      role: 'Member',
    },
    {
      key: '4',
      name: {
        fullname: 'Jenny Wilson',
        email: 'jenny.wilson@example.com',
        image:
          'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      title: ['Central Security Manager', 'Program'],
      status: 'Active',
      role: 'Member',
    },
    {
      key: '5',
      name: {
        fullname: 'Kristin Watson',
        email: 'kristin.watson@example.com',
        image:
          'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      title: ['Lead Implementation Liaison', 'Mobility'],
      status: 'Active',
      role: 'Admin',
    },
    {
      key: '6',
      name: {
        fullname: 'Cameron Williamson',
        email: 'cameron.williamson@example.com',
        image:
          'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      },
      title: ['Internal Applications Engineer', 'Security'],
      status: 'Active',
      role: 'Member',
    },
  ]

  return <Table columns={columns} dataSource={dataSource} />
}
