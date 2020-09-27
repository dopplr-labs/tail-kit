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
      <Option value="Black Widow">Black Widow</Option>
      <Option value="Hulk">Hulk</Option>
      <Option value="Spiderman">Spiderman</Option>
      <Option value="Captain America">Captian America</Option>
      <Option value="Doctor Strange">Doctor Strange</Option>
      <Option value="Hawk Eye">Hawk Eye</Option>
    </Select>
  )
}
