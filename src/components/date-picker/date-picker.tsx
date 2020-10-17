import React, { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import useSyncedState from 'hooks/use-synced-states'
import {
  CalendarOutline,
  ChevronDoubleLeftOutline,
  ChevronDoubleRightOutline,
  ChevronLeftOutline,
  ChevronRightOutline,
  XCircleSolid,
} from 'components/icons'
import Portal from 'components/portal'
import useOutsideClick from 'hooks/use-outside-click'
import { Keys } from 'utils/keyboard'
import { Week } from './components/week'

/**
 * Helper function to compare dates
 *
 * @param dateA First date
 * @param dateB Second date
 * @param comparatorFunction Comparator function to compare dates
 */
function compareDates(
  dateA: Date | undefined,
  dateB: Date | undefined,
  comparatorFunction: (date: Date) => number = (date) =>
    dayjs(date).startOf('day').valueOf(),
): boolean {
  if (typeof dateA === 'undefined' && typeof dateB === 'undefined') {
    return true
  }

  if (!dateA || !dateB) {
    return false
  }

  return comparatorFunction(dateA) === comparatorFunction(dateB)
}

type OnChangeType = (dateSelected: Date | undefined) => void

/** Date picker properties */
export type DatePickerProps = {
  /**
   * Default date selected. It can used to set a default date when using
   * the date picker as uncontrolled component
   */
  defaultDate?: Date
  /**
   * Date selected. It should be used along with `onChange` prop to set the
   * date when using date picker as controlled component
   */
  date?: Date
  /** Callback function called when the date is changed. */
  onChange?: OnChangeType
  /** Placeholder for empty date picker */
  placeholder?: string
  /** Show clear button when a date is selected */
  allowClear?: boolean
  /** Addtional classes to style date picker */
  className?: string
  /** Additional styles for date picker */
  style?: React.CSSProperties
}

/** Component to render **date picker** */
export function DatePicker({
  date,
  defaultDate,
  onChange,
  placeholder = 'Select Date',
  allowClear = false,
  className,
  style,
}: DatePickerProps) {
  const [dateSelected, setDateSelected] = useSyncedState<Date | undefined>(
    date || defaultDate,
  )

  const [activeMonth, setActiveMonth] = useState(
    dayjs(date || defaultDate || new Date()).startOf('month'),
  )

  const onChangeCb = useRef<OnChangeType | undefined>(undefined)
  onChangeCb.current = onChange

  useEffect(() => {
    if (compareDates(date || defaultDate, dateSelected)) {
      onChangeCb.current?.(dateSelected)
    }
  }, [date, defaultDate, dateSelected])

  const weeks = useMemo(() => {
    const monthStartWeek = dayjs(activeMonth)
      .clone()
      .startOf('month')
      .startOf('week')
    const monthEndWeek = dayjs(activeMonth)
      .clone()
      .endOf('month')
      .startOf('week')
    const monthWeeks = []

    for (
      let date = monthStartWeek;
      date <= monthEndWeek;
      date = dayjs(date).add(1, 'week')
    ) {
      monthWeeks.push(date)
    }

    return monthWeeks
  }, [activeMonth])

  const [calendarOpen, setCalendarOpen] = useState(false)

  const trigger = useRef<HTMLButtonElement | null>(null)
  const datesContainer = useRef<HTMLUListElement | null>(null)

  useOutsideClick({
    containers: [trigger, datesContainer],
    active: calendarOpen,
    onClick: () => {
      setCalendarOpen(false)
    },
  })

  return (
    <div className={clsx(className)} style={style}>
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-300 border rounded-md focus:outline-none focus:shadow-outline"
        ref={trigger}
        onClick={() => {
          setCalendarOpen((prevState) => !prevState)
        }}
        onKeyDown={(event) => {
          if (event.key === Keys.ArrowDown || event.key === Keys.ArrowUp) {
            event.preventDefault()
            setCalendarOpen(true)
          }
        }}
      >
        <span className="text-gray-800">
          {dateSelected
            ? dayjs(dateSelected).format('DD MMM YYYY')
            : placeholder}
        </span>
        {dateSelected && allowClear ? (
          <div
            role="button"
            onClick={(event) => {
              event.stopPropagation()
              setDateSelected(undefined)
              setActiveMonth(dayjs())
            }}
          >
            <XCircleSolid className="w-5 h-5" />
          </div>
        ) : (
          <CalendarOutline className="w-5 h-5" />
        )}
      </button>
      <Portal
        visible={calendarOpen}
        triggerRef={trigger}
        onContentMount={() => {
          datesContainer.current?.focus()
        }}
        onContentUnmount={() => {
          trigger.current?.focus()
        }}
      >
        <ul
          className="bg-white rounded-md shadow-md w-72 focus:outline-none"
          ref={datesContainer}
          tabIndex={0}
        >
          <div className="flex items-center px-4 py-2 border-b border-gray-100">
            <button
              className="p-1 mr-1 text-gray-400 transition-colors duration-100 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-50"
              onClick={() => {
                setActiveMonth((prevState) => prevState.subtract(1, 'year'))
              }}
            >
              <ChevronDoubleLeftOutline className="w-5 h-5" />
            </button>
            <button
              className="p-1 mr-1 text-gray-400 transition-colors duration-100 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-50"
              onClick={() => {
                setActiveMonth((prevState) => prevState.subtract(1, 'month'))
              }}
            >
              <ChevronLeftOutline className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <div className="text-sm font-medium text-gray-700">
              {activeMonth.format('MMM YYYY')}
            </div>
            <div className="flex-1" />
            <button
              className="p-1 mr-1 text-gray-400 transition-colors duration-100 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-50"
              onClick={() => {
                setActiveMonth((prevState) => prevState.add(1, 'month'))
              }}
            >
              <ChevronRightOutline className="w-5 h-5" />
            </button>
            <button
              className="p-1 mr-1 text-gray-400 transition-colors duration-100 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-50"
              onClick={() => {
                setActiveMonth((prevState) => prevState.add(1, 'year'))
              }}
            >
              <ChevronDoubleRightOutline className="w-5 h-5" />
            </button>
          </div>
          <div className="px-4 py-2 space-y-2 border-b">
            {weeks.map((weekStartDate) => (
              <Week
                key={weekStartDate.valueOf()}
                weekStartDate={weekStartDate}
                activeMonth={activeMonth}
                dateSelected={dateSelected ? dayjs(dateSelected) : undefined}
                onDateClick={(day) => {
                  setActiveMonth(day)
                  setDateSelected(day.toDate())
                  setCalendarOpen(false)
                }}
              />
            ))}
          </div>
          <button
            className="w-full px-4 py-2 text-sm font-medium text-blue-500 focus:shadow-outline rounded-b-md focus:outline-none"
            onClick={() => {
              setActiveMonth(dayjs())
              setDateSelected(dayjs().toDate())
              setCalendarOpen(false)
            }}
          >
            Today
          </button>
        </ul>
      </Portal>
    </div>
  )
}
