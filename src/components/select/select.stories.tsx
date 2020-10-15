import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import {
  BeakerOutline,
  BookOpenOutline,
  CalculatorOutline,
  CalendarOutline,
  ClipboardOutline,
  DatabaseOutline,
} from 'components/icons'
import { Select } from './select'

export default {
  title: 'Data Entry/Select',
  component: Select,
} as Meta

const users = [
  {
    id: 'e175effc-43fc-4ea4-9dd3-e41cabf02c53',
    name: 'Aaron Feest',
    profileImage: 'https://randomuser.me/api/portraits/women/85.jpg',
  },
  {
    id: '6b168c96-d2d3-42f4-8fd8-a815dd169d10',
    name: 'Miss Suzanne Dach',
    profileImage: 'https://randomuser.me/api/portraits/women/86.jpg',
  },
  {
    id: '1c48423c-9ddc-4690-a432-f35c30bb6648',
    name: 'Maureen Yundt',
    profileImage: 'https://randomuser.me/api/portraits/women/87.jpg',
  },
  {
    id: '51de8784-c7e1-41ed-b5b2-c362d0bd9ffa',
    name: 'Constance Purdy',
    profileImage: 'https://randomuser.me/api/portraits/women/88.jpg',
  },
  {
    id: '0e483de3-5e21-4dfa-84f8-7d08fdd7b89a',
    name: 'Ellen Friesen',
    profileImage: 'https://randomuser.me/api/portraits/women/89.jpg',
  },
  {
    id: '9b2bf07a-0463-453d-beb1-441c7e1b6352',
    name: 'Melinda Hoppe',
    profileImage: 'https://randomuser.me/api/portraits/women/90.jpg',
  },
  {
    id: '7e91de3b-4848-47a6-81e5-f7b7e3da448a',
    name: 'Dave Waters',
    profileImage: 'https://randomuser.me/api/portraits/women/91.jpg',
  },
  {
    id: '9485694d-2be9-4f57-b6da-f56eb20928eb',
    name: 'Heidi Glover',
    profileImage: 'https://randomuser.me/api/portraits/women/92.jpg',
  },
  {
    id: '5f37c360-8613-4be1-9904-49cfbec9d3cc',
    name: 'Gary Wyman',
    profileImage: 'https://randomuser.me/api/portraits/women/93.jpg',
  },
  {
    id: '6448517f-ab88-4c84-9e5d-25a445a65d11',
    name: 'Leonard Gutkowski',
    profileImage: 'https://randomuser.me/api/portraits/men/80.jpg',
  },
]

export function DefaultSelect() {
  return (
    <Select
      placeholder="Select User"
      options={users.map((user) => ({
        value: user.id,
        label: user.name,
      }))}
      className="w-64"
    />
  )
}

export function SelectWithIcon() {
  return (
    <div className="flex space-x-4">
      <Select
        placeholder="Select User"
        options={users.map((user) => ({
          value: user.id,
          label: user.name,
          icon: (
            <img
              src={user.profileImage}
              className="object-cover w-6 h-6 rounded-full"
              alt={user.name}
            />
          ),
        }))}
        className="w-64"
      />
      <Select
        placeholder="Select Icon"
        className="w-64"
        options={[
          { value: 'beaker', label: 'Beaker', icon: <BeakerOutline /> },
          {
            value: 'calculator',
            label: 'Calculator',
            icon: <CalculatorOutline />,
          },
          { value: 'book-open', label: 'Book Open', icon: <BookOpenOutline /> },
          { value: 'calendar', label: 'Calendar', icon: <CalendarOutline /> },
          {
            value: 'clipboard',
            label: 'Clipboard',
            icon: <ClipboardOutline />,
          },
        ]}
      />
    </div>
  )
}

export function DisabledSelect() {
  return (
    <Select
      placeholder="Select User"
      options={users.map((user) => ({
        value: user.id,
        label: user.name,
      }))}
      className="w-64"
      disabled
    />
  )
}

export function SelectWithClearButton() {
  return (
    <Select
      placeholder="Select User"
      options={users.map((user) => ({
        value: user.id,
        label: user.name,
        icon: (
          <img
            src={user.profileImage}
            className="object-cover w-6 h-6 rounded-full"
            alt={user.name}
          />
        ),
      }))}
      className="w-64"
      allowClear
    />
  )
}

export function ControlledSelectComponent() {
  const [valueSelected, setValueSelected] = useState<string | undefined>(
    undefined,
  )

  return (
    <div className="flex items-center space-x-4">
      <Select
        placeholder="Select User"
        options={users.map((user) => ({
          value: user.id,
          label: user.name,
          icon: (
            <img
              src={user.profileImage}
              className="object-cover w-6 h-6 rounded-full"
              alt={user.name}
            />
          ),
        }))}
        className="w-64"
        allowClear
        value={valueSelected}
        onChange={setValueSelected}
      />
      {valueSelected ? (
        <div>
          <div className="text-xs font-semibold text-blue-500">
            Selected User
          </div>
          <div className="text-sm text-gray-800">
            {users.find((user) => user.id === valueSelected)?.name}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function SelectWithDisabledOptions() {
  return (
    <Select
      placeholder="Select Icon"
      className="w-64"
      allowClear
      options={[
        {
          value: 'beaker',
          label: 'Beaker',
          icon: <BeakerOutline />,
          disabled: true,
        },
        {
          value: 'calculator',
          label: 'Calculator',
          icon: <CalculatorOutline />,
        },
        {
          value: 'book-open',
          label: 'Book Open',
          icon: <BookOpenOutline />,
          disabled: true,
        },
        { value: 'calendar', label: 'Calendar', icon: <CalendarOutline /> },
        { value: 'database', label: 'Database', icon: <DatabaseOutline /> },
        {
          value: 'clipboard',
          label: 'Clipboard',
          icon: <ClipboardOutline />,
          disabled: true,
        },
      ]}
    />
  )
}

export function SelectWithAllDisabledOptions() {
  return (
    <Select
      placeholder="Select User"
      className="w-64"
      options={users.map((user) => ({
        value: user.id,
        label: user.name,
        icon: (
          <img
            src={user.profileImage}
            className="object-cover w-6 h-6 rounded-full"
            alt={user.name}
          />
        ),
        disabled: true,
      }))}
    />
  )
}
