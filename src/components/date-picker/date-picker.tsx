import React, { useEffect, useMemo, useReducer, useRef } from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
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
import usePrevious from 'hooks/use-previous'
import { Week } from './components/week'
import { ActionType, reducer } from './reducer'

/**
 * Helper function to compare dates
 *
 * @param dateA First date
 * @param dateB Second date
 * @param comparatorFunction Comparator function to compare dates
 */
function isDateEqual(
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
  const [{ open, dateSelected, activeMonth }, dispatch] = useReducer(reducer, {
    open: false,
    dateSelected: date || defaultDate,
    activeMonth: date || defaultDate || new Date(),
  })

  const prevDate = usePrevious(date)

  const onChangeCb = useRef<OnChangeType | undefined>(undefined)
  onChangeCb.current = onChange

  useEffect(() => {
    // if date is not same as the dateSelected (local state) that means
    // either the date has changed or dateSelected has change
    // and based on which variable changed the consequence should be different
    if (!isDateEqual(date, dateSelected)) {
      // if the date is not equal to the prevDate, that means that the date variable
      // has changed
      if (!isDateEqual(date, prevDate)) {
        // set or clear date depending on the date value
        if (date) {
          dispatch({ type: ActionType.SELECT_DATE, payload: { date } })
        } else {
          dispatch({ type: ActionType.CLEAR_DATE })
        }
      } else {
        // if the date and prevDate are same that means that dateSelected (local state)
        // has changed, then we should call the onChange callback
        onChangeCb.current?.(dateSelected)
      }
    }
  }, [date, prevDate, dateSelected])

  useEffect(() => {}, [date, prevDate])

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

  const trigger = useRef<HTMLButtonElement | null>(null)
  const datesContainer = useRef<HTMLUListElement | null>(null)

  useOutsideClick({
    containers: [trigger, datesContainer],
    active: open,
    onClick: () => {
      dispatch({ type: ActionType.CLOSE })
    },
  })

  return (
    <div className={clsx(className)} style={style}>
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-300 border rounded-md focus:outline-none focus:shadow-outline"
        ref={trigger}
        onClick={() => {
          dispatch({ type: ActionType.TOGGLE_OPEN })
        }}
        onKeyDown={(event) => {
          if (event.key === Keys.ArrowDown || event.key === Keys.ArrowUp) {
            event.preventDefault()
            dispatch({ type: ActionType.OPEN })
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
              dispatch({ type: ActionType.CLEAR_DATE })
            }}
            data-testid="clear-date"
          >
            <XCircleSolid className="w-5 h-5" />
          </div>
        ) : (
          <CalendarOutline className="w-5 h-5" />
        )}
      </button>
      <Portal
        visible={open}
        triggerRef={trigger}
        onContentMount={() => {
          if (dateSelected) {
            ;(datesContainer.current?.querySelector(
              `button[data-testid="${dayjs(dateSelected).format(
                'DD-MM-YYYY',
              )}"]`,
            ) as HTMLButtonElement | undefined)?.focus()
          } else {
            datesContainer.current?.focus()
          }
        }}
        onContentUnmount={() => {
          trigger.current?.focus()
        }}
      >
        <ul
          className="bg-white rounded-md shadow-md w-72 focus:outline-none"
          ref={datesContainer}
          tabIndex={0}
          data-testid="dates-container"
        >
          <div className="flex items-center px-4 py-2 border-b border-gray-100">
            <button
              className="p-1 mr-1 text-gray-400 transition-colors duration-100 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-50"
              onClick={() => {
                dispatch({ type: ActionType.MOVE_TO_PREV_YEAR })
              }}
              data-testid="move-to-prev-year"
            >
              <ChevronDoubleLeftOutline className="w-5 h-5" />
            </button>
            <button
              className="p-1 mr-1 text-gray-400 transition-colors duration-100 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-50"
              onClick={() => {
                dispatch({ type: ActionType.MOVE_TO_PREV_MONTH })
              }}
              data-testid="move-to-prev-month"
            >
              <ChevronLeftOutline className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <div className="text-sm font-medium text-gray-700">
              {dayjs(activeMonth).format('MMM YYYY')}
            </div>
            <div className="flex-1" />
            <button
              className="p-1 mr-1 text-gray-400 transition-colors duration-100 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-50"
              onClick={() => {
                dispatch({ type: ActionType.MOVE_TO_NEXT_MONTH })
              }}
              data-testid="move-to-next-month"
            >
              <ChevronRightOutline className="w-5 h-5" />
            </button>
            <button
              className="p-1 mr-1 text-gray-400 transition-colors duration-100 rounded-md focus:outline-none focus:shadow-outline hover:bg-gray-50"
              onClick={() => {
                dispatch({ type: ActionType.MOVE_TO_NEXT_YEAR })
              }}
              data-testid="move-to-next-year"
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
                onDateClick={(date) => {
                  dispatch({ type: ActionType.SELECT_DATE, payload: { date } })
                }}
              />
            ))}
          </div>
          <button
            className="w-full px-4 py-2 text-sm font-medium text-blue-500 focus:shadow-outline rounded-b-md focus:outline-none"
            onClick={() => {
              dispatch({
                type: ActionType.SELECT_DATE,
                payload: { date: dayjs().toDate() },
              })
            }}
          >
            Today
          </button>
        </ul>
      </Portal>
    </div>
  )
}
