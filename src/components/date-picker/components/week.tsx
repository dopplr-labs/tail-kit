import clsx from 'clsx'
import React from 'react'
import dayjs from 'dayjs'
import { range } from 'lodash-es'

export type WeekProps = {
  weekStartDate: dayjs.Dayjs
  activeMonth: Date
  dateSelected?: dayjs.Dayjs
  onDateClick: (date: Date, event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  style?: React.CSSProperties
}

export function Week({
  weekStartDate,
  activeMonth,
  dateSelected,
  onDateClick,
  className,
  style,
}: WeekProps) {
  const weekDays = range(7).map((val) => weekStartDate.add(val, 'day'))

  return (
    <li
      className={clsx('flex items-center space-x-2 justify-between', className)}
      style={style}
    >
      {weekDays.map((day) => {
        const isActive =
          day.format('MMM YYYY') === dayjs(activeMonth).format('MMM YYYY')
        const isSelected = dateSelected
          ? dateSelected.format('DD MMM YYYY') === day.format('DD MMM YYYY')
          : false
        const isCurrentDate =
          day.format('DD MMM YYYY') === dayjs().format('DD MMM YYYY')

        let buttonClassName
        if (isSelected) {
          buttonClassName = 'bg-blue-600 text-white'
        } else if (isActive) {
          buttonClassName = 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
        } else {
          buttonClassName = 'text-gray-300 hover:bg-gray-50'
        }

        if (isCurrentDate && !isSelected) {
          buttonClassName = `${buttonClassName} border-b-2 border-blue-500 rounded-b-none text-blue-600`
        }

        return (
          <button
            key={day.valueOf()}
            data-testid={day.format('DD-MM-YYYY')}
            className={clsx(
              'py-1 text-sm rounded focus:outline-none focus:shadow-outline font-medium transition-colors duration-100 w-7',
              buttonClassName,
            )}
            onClick={(event) => {
              onDateClick(day.toDate(), event)
            }}
          >
            {day.format('DD')}
          </button>
        )
      })}
    </li>
  )
}
