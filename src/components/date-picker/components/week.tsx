import clsx from 'clsx'
import React from 'react'
import dayjs from 'dayjs'
import range from 'utils/range'
import { isDateDisabled } from '../utils'

export type WeekProps = {
  /** Start date of the week */
  weekStartDate: dayjs.Dayjs
  /**
   * Active month. This is helpful show distinguish days between the active month and other months
   */
  activeMonth: Date
  /**
   * Date selected by the user
   */
  dateSelected?: dayjs.Dayjs
  /**
   * Callback function called when user selects a date
   */
  onDateClick: (date: Date, event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Start date for the date picker.
   * All the dates before the start date would be disabled
   */
  startDate?: Date
  /**
   * End date for the date picker
   * All the dates after the end date would be disabled
   */
  endDate?: Date
  /**
   * Function to determine whether a particular date should be disabled or not
   * It is helpful in the cases where we want to disable dates based on a custom
   * logic rather than range values specfied by `startDate` and `endDate` prop
   */
  disableDate?: (date: Date) => boolean
  /** Additional classes for styling a week */
  className?: string
  /** Additional styles */
  style?: React.CSSProperties
}

export function Week({
  weekStartDate,
  activeMonth,
  dateSelected,
  onDateClick,
  startDate,
  endDate,
  disableDate,
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
        const isDisabled = isDateDisabled(
          day.toDate(),
          startDate,
          endDate,
          disableDate,
        )

        let buttonClassName
        if (isDisabled) {
          buttonClassName = 'text-gray-200 cursor-not-allowed'
        } else {
          if (isSelected) {
            buttonClassName = 'bg-blue-600 text-white'
          } else if (isActive) {
            buttonClassName =
              'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
          } else {
            buttonClassName = 'text-gray-400 hover:bg-gray-50'
          }
        }

        if (isCurrentDate && !isSelected && !isDisabled) {
          buttonClassName = `${buttonClassName} border-b-2 border-blue-500 rounded-b-none text-blue-600`
        }

        return (
          <button
            aria-label={day.format('DD MMM YYYY')}
            key={day.valueOf()}
            data-date={day.format('DD-MM-YYYY')}
            className={clsx(
              'py-1 text-sm rounded focus:outline-none focus:ring-2 font-medium transition-colors duration-100 w-7',
              buttonClassName,
            )}
            onClick={(event) => {
              onDateClick(day.toDate(), event)
            }}
            disabled={isDisabled}
          >
            {day.format('DD')}
          </button>
        )
      })}
    </li>
  )
}
