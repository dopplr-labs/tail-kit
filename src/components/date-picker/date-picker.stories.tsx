import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { DatePicker } from './date-picker'

export default {
  title: 'Data Entry/Date Picker',
  component: DatePicker,
} as Meta

export function DefaultDatePicker() {
  return <DatePicker className="w-64" allowClear />
}
