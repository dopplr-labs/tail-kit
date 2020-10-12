import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Select } from './select'

export default {
  title: 'Data Entry/Select',
  component: Select,
} as Meta

const users = [
  {
    id: 'e175effc-43fc-4ea4-9dd3-e41cabf02c53',
    name: 'Aaron Feest',
    profileImage:
      'http://placeimg.com/24/24/people?random=aa2ce139-933d-41a8-8dc4-acc6d07d21d3',
  },
  {
    id: '6b168c96-d2d3-42f4-8fd8-a815dd169d10',
    name: 'Miss Suzanne Dach',
    profileImage:
      'http://placeimg.com/24/24/people?random=a235b491-57d5-47fc-a162-16f8bf8e2f53',
  },
  {
    id: '1c48423c-9ddc-4690-a432-f35c30bb6648',
    name: 'Maureen Yundt',
    profileImage:
      'http://placeimg.com/24/24/people?random=f9a95d53-8149-4bfa-b0d5-586f8b92a9e2',
  },
  {
    id: '51de8784-c7e1-41ed-b5b2-c362d0bd9ffa',
    name: 'Constance Purdy',
    profileImage:
      'http://placeimg.com/24/24/people?random=caa2998b-e01b-4471-8503-efac7125d884',
  },
  {
    id: '0e483de3-5e21-4dfa-84f8-7d08fdd7b89a',
    name: 'Ellen Friesen',
    profileImage:
      'http://placeimg.com/24/24/people?random=fd506742-bc76-4976-a8fb-9a0f54ecc80e',
  },
  {
    id: '9b2bf07a-0463-453d-beb1-441c7e1b6352',
    name: 'Melinda Hoppe',
    profileImage:
      'http://placeimg.com/24/24/people?random=592fe01f-3ffd-49c5-aa07-e6c566a738cf',
  },
  {
    id: '7e91de3b-4848-47a6-81e5-f7b7e3da448a',
    name: 'Dave Waters',
    profileImage:
      'http://placeimg.com/24/24/people?random=3cbbd2a0-b7f3-4aa7-a01e-33705ec3ff19',
  },
  {
    id: '9485694d-2be9-4f57-b6da-f56eb20928eb',
    name: 'Heidi Glover',
    profileImage:
      'http://placeimg.com/24/24/people?random=d6ad4cc3-ac15-4c0e-a298-a041e1537a1d',
  },
  {
    id: '5f37c360-8613-4be1-9904-49cfbec9d3cc',
    name: 'Gary Wyman',
    profileImage:
      'http://placeimg.com/24/24/people?random=ba7b1fae-f37d-4fc2-b4e4-8e895d5e65b8',
  },
  {
    id: '6448517f-ab88-4c84-9e5d-25a445a65d11',
    name: 'Leonard Gutkowski',
    profileImage:
      'http://placeimg.com/24/24/people?random=79a875bb-efef-4948-a20d-73ce104d3f6c',
  },
]

export function DefaultSelect() {
  return (
    <Select
      options={users.map((user) => ({
        value: user.name,
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
  )
}
