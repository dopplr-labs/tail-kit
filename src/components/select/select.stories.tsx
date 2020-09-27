import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Select } from './select'

export default {
  title: 'Data Entry/Select',
  component: Select,
} as Meta

export function DefaultSelect() {
  const options = [
    'Black Widow',
    'Hulk',
    'Spiderman',
    'Captain America',
    'Doctor Strange',
    'Hawk Eye',
  ]
  return <Select label="Select Avenger" options={options} className="w-48" />
}
