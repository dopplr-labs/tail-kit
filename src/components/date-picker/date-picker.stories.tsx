import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { DatePicker } from './date-picker'

export default {
  title: 'Data Entry/Date Picker',
  component: DatePicker,
} as Meta

export function DefaultDatePicker() {
  const [dateSelected, setDateSelected] = useState<Date | undefined>(undefined)

  return (
    <div className="w-64">
      <DatePicker date={dateSelected} onChange={setDateSelected} />
    </div>
  )
}
