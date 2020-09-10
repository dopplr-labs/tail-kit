import React, { useState } from 'react'
import {
  CalendarOutline,
  ChevronDoubleLeftOutline,
  ChevronLeftOutline,
  ChevronDoubleRightOutline,
  ChevronRightOutline,
  XCircleSolid,
} from 'components/icons'
import dayjs from 'dayjs'
import clsx from 'clsx'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

export type DatePickerProps = {
  /** date selected */
  date?: Date
  /** callback function that is called on date change  */
  onChange?: (date: Date | undefined) => void
  /** placeholder text */
  placeholder?: string
  /** additional classes for date picker */
  className?: string
  /** additional styles for date picker */
  style?: React.CSSProperties
}

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function getMonthDates(date: Date): [Date[]] {
  const startOfMonth = dayjs(date).startOf('month')
  let startDate = dayjs(startOfMonth).startOf('week')

  const endOfMonth = dayjs(date).endOf('month')
  const endWeekOfMonth = dayjs(endOfMonth).startOf('week')

  const dates = []

  while (startDate.valueOf() <= endWeekOfMonth.valueOf()) {
    const weekDates = Array.from({ length: 7 }).map((_, index) =>
      startDate.add(index, 'day').toDate(),
    )
    dates.push(weekDates)
    startDate = startDate.add(1, 'week')
  }

  return dates as [Date[]]
}

export function DatePicker({
  date,
  onChange,
  placeholder = 'Select Date',
  className,
  style,
}: DatePickerProps) {
  const [activeDate, setActiveDate] = useState(
    dayjs(date || new Date())
      .startOf('month')
      .toDate(),
  )

  const [containerHeight, setContainerHeight] = useState<number | undefined>(
    undefined,
  )

  const monthDates = getMonthDates(activeDate)

  return (
    <div style={style} className={className}>
      <div className="flex items-center px-3 py-2 space-x-3 text-gray-400 border rounded-md">
        {date ? (
          <span className="flex-1 text-sm text-gray-400">
            {dayjs(date).format('DD MMM YYYY')}
          </span>
        ) : (
          <span className="flex-1 text-sm text-gray-400">{placeholder}</span>
        )}
        {date ? (
          <button
            className="focus:outline-none focus:shadow-outline"
            onClick={() => {
              if (onChange) {
                onChange(undefined)
              }
            }}
          >
            <XCircleSolid className="w-5 h-5" />
          </button>
        ) : (
          <CalendarOutline className="w-5 h-5" />
        )}
      </div>
      <div className="rounded shadow w-80">
        <div className="flex items-center px-4 py-3 space-x-2 text-gray-400 transition-colors duration-75 ease-in border-b hover:text-gray-800">
          <button
            className="rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              setActiveDate((prevState) =>
                dayjs(prevState).subtract(1, 'year').toDate(),
              )
            }}
          >
            <ChevronDoubleLeftOutline className="w-5 h-5" />
          </button>
          <button
            className="rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              setActiveDate((prevState) =>
                dayjs(prevState).subtract(1, 'month').toDate(),
              )
            }}
          >
            <ChevronLeftOutline className="w-5 h-5" />
          </button>
          <span
            className="flex-1 text-sm font-medium text-center text-gray-800"
            onClick={() => {
              setActiveDate((prevState) =>
                dayjs(prevState).add(1, 'month').toDate(),
              )
            }}
          >
            {dayjs(activeDate).format('MMM YYYY')}
          </span>
          <button
            className="rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              setActiveDate((prevState) =>
                dayjs(prevState).add(1, 'month').toDate(),
              )
            }}
          >
            <ChevronRightOutline className="w-5 h-5" />
          </button>
          <button
            className="rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              setActiveDate((prevState) =>
                dayjs(prevState).add(1, 'year').toDate(),
              )
            }}
          >
            <ChevronDoubleRightOutline className="w-5 h-5" />
          </button>
        </div>

        <div
          className="transition-all duration-100 ease-in"
          style={{ height: containerHeight }}
        >
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={dayjs(activeDate).valueOf()}
              classNames="date-picker"
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false)
              }}
              onEnter={(node: HTMLElement) => {
                setContainerHeight(node.offsetHeight)
              }}
            >
              <div className="px-4 py-3 border-b">
                <div className="flex items-center mb-2 space-x-1">
                  {days.map((day) => (
                    <div
                      key={day}
                      className="flex-1 text-sm font-semibold text-gray-900"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  {monthDates.map((weekDays) => (
                    <div
                      className="flex items-center space-x-1"
                      key={dayjs(weekDays[0]).valueOf()}
                    >
                      {weekDays.map((day) => (
                        <button
                          key={dayjs(day).valueOf()}
                          className={clsx(
                            'flex-1 text-sm focus:outline-none focus:shadow-outline rounded',
                            date && dayjs(date).valueOf() === day.valueOf()
                              ? 'text-blue-600 hover:bg-blue-600 hover:text-white font-medium bg-blue-50'
                              : dayjs(day).format('MM YY') ===
                                dayjs(activeDate).format('MM YY')
                              ? 'text-gray-600 hover:bg-gray-100'
                              : 'text-gray-300 hover:bg-gray-100',
                          )}
                          onClick={() => {
                            setActiveDate(dayjs(day).startOf('month').toDate())
                            if (onChange) {
                              onChange(day)
                            }
                          }}
                        >
                          {dayjs(day).format('DD')}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <button
          className="w-full px-4 py-2 text-sm font-medium text-center text-blue-600 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            setActiveDate(new Date())
          }}
        >
          Today
        </button>
      </div>
    </div>
  )
}
