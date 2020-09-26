import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Select } from './select'

export default {
  title: 'Data Entry/Select',
  component: Select,
} as Meta

export function DefaultSelect() {
  return <Select className="w-32" />
}
