import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Select, Option } from './select'

export default {
  title: 'Data Entry/Select',
  component: Select,
} as Meta

export function DefaultSelect() {
  return (
    <Select defaultValue="Spiderman" className="w-48">
      <Option>Black Widow</Option>
      <Option>Hulk</Option>
      <Option>Spiderman</Option>
      <Option>Captian America</Option>
      <Option>Doctor Strange</Option>
      <Option>Hawk Eye</Option>
    </Select>
  )
}
