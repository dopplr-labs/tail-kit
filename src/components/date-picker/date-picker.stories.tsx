import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import dayjs from 'dayjs'
import { DatePicker } from './date-picker'

export default {
  title: 'Data Entry/Date Picker',
  component: DatePicker,
} as Meta

export function DefaultDatePicker() {
  return <DatePicker className="w-64" allowClear />
}

export function ControllerDatePicker() {
  const [dateSelected, setDateSelected] = useState<Date | undefined>(undefined)

  return (
    <div className="flex items-center space-x-4">
      <DatePicker
        className="w-64"
        allowClear
        date={dateSelected}
        onChange={setDateSelected}
      />
      {dateSelected ? (
        <div>
          <div className="text-xs font-medium text-blue-500">Date Selected</div>
          <div className="text-sm txt-gray-800">
            {dayjs(dateSelected).format('DD-MM-YYYY')}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function DatePickerWithDateRange() {
  const delta = 10
  return (
    <DatePicker
      className="w-64"
      allowClear
      startDate={dayjs().subtract(delta, 'day').toDate()}
      endDate={dayjs().add(delta, 'day').toDate()}
    />
  )
}

export function WeekdaysOnlyDatePicker() {
  return (
    <DatePicker
      className="w-64"
      allowClear
      placeholder="Select Week Day"
      disableDate={(date) => {
        const day = dayjs(date).day()
        return day === 6 || day === 0
      }}
    />
  )
}
