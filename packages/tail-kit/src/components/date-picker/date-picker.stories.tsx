import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import dayjs from 'dayjs'
import Button from 'components/button'
import Modal from 'components/modal'
import Alert from 'components/alert'
import Select from 'components/select'
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

export function DatePickerWithModal() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <Button
        label="Click To Open Modal"
        onClick={() => {
          setModalVisible(true)
        }}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
        title="Cron Job"
      >
        <Alert
          title="Job Runner"
          content="Schedule the job to run in a weekday as you won't want to spend your weekend on debugging"
          className="mb-4"
        />
        <div className="flex space-x-4">
          <Select
            placeholder="Select Schedule"
            options={[
              {
                label: 'Every Minute (* * * * *)',
                value: '* * * * *',
              },
              {
                label: 'Every 15 minutes (*/15 * * * *)',
                value: '*/15 * * * *',
              },
              {
                label: 'Every Hour (0 * * * *)',
                value: '0 * * * *',
              },
              {
                label: 'Every 2 Hours (0 */2 * * *)',
                value: '0 */2 * * *',
              },
            ]}
            className="flex-1"
          />
          <DatePicker
            allowClear
            placeholder="Select Day"
            disableDate={(date) => {
              const day = dayjs(date).day()
              return day === 6 || day === 0
            }}
            className="flex-1"
          />
        </div>
      </Modal>
    </>
  )
}
