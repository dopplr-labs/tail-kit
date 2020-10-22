import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import dayjs from 'dayjs'
import { DatePicker } from './date-picker'

test('shows placeholder when no date is selected', () => {
  render(<DatePicker />)
  expect(screen.getByText(/select date/i)).toBeInTheDocument()
})

test('shows selected date', () => {
  // date -> 10th November 2020 (as monthIndex starts from 0)
  const { rerender } = render(<DatePicker date={new Date(2020, 10, 10)} />)
  expect(screen.getByText(/10 nov 2020/i)).toBeInTheDocument()
  rerender(<DatePicker date={new Date(2020, 11, 10)} />)
  expect(screen.getByText(/10 dec 2020/i)).toBeInTheDocument()
  rerender(<DatePicker date={undefined} />)
  expect(screen.getByText(/select date/i)).toBeInTheDocument()
})

test('toggles calendar visibilty on clicking on the placeholder', async () => {
  render(<DatePicker />)
  fireEvent.click(screen.getByText(/select date/i))
  expect(screen.getByLabelText('calendar')).toBeInTheDocument()
  fireEvent.click(screen.getByText(/select date/i))
  await waitForElementToBeRemoved(() => screen.getByLabelText('calendar'))
})

test('opens calendar on press down arrow key', () => {
  render(<DatePicker />)
  fireEvent.focus(screen.getByRole('button'))
  fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' })
  expect(screen.getByLabelText('calendar')).toBeInTheDocument()
})

test('opens calendar on press up arrow key', () => {
  render(<DatePicker />)
  fireEvent.focus(screen.getByRole('button'))
  fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowUp' })
  expect(screen.getByLabelText('calendar')).toBeInTheDocument()
})

test('focuses on the date selected button on opening the calendar', () => {
  render(<DatePicker date={new Date(2020, 10, 10)} />)
  fireEvent.click(screen.getByText('10 Nov 2020'))
  expect(document.activeElement).toEqual(screen.getByLabelText('10 Nov 2020'))
})

test('select date correctly on clicking on date button', async () => {
  const today = dayjs()

  render(<DatePicker />)
  fireEvent.click(screen.getByText(/select date/i))
  fireEvent.click(screen.getByLabelText(today.format('DD MMM YYYY')))

  // the date is selected
  await waitFor(() => {
    expect(screen.getByText(today.format('DD MMM YYYY'))).toBeInTheDocument()
  })
  // the calendar is closed
  await waitForElementToBeRemoved(() => screen.getByLabelText('calendar'))
})

test("select today's date on click on the today button", async () => {
  const today = dayjs()

  render(<DatePicker />)
  fireEvent.click(screen.getByText(/select date/i))
  fireEvent.click(screen.getByText(/today/i))

  // the date is selected
  await waitFor(() => {
    expect(screen.getByText(today.format('DD MMM YYYY'))).toBeInTheDocument()
  })
  // the calendar is closed
  await waitForElementToBeRemoved(() => screen.getByLabelText('calendar'))
})

test('clears the date on click on the clear button', async () => {
  render(<DatePicker allowClear />)
  fireEvent.click(screen.getByText(/select date/i))
  fireEvent.click(screen.getByText(/today/i))
  fireEvent.click(screen.getByLabelText('clear date'))

  await waitFor(() => {
    expect(screen.getByText(/select date/i)).toBeInTheDocument()
  })
})

test('shows current month', () => {
  const today = dayjs()
  const startOfMonth = dayjs().startOf('month')
  const endOfMonth = dayjs().endOf('month')

  render(<DatePicker allowClear />)
  fireEvent.click(screen.getByText(/select date/i))

  expect(screen.getByText(today.format('MMM YYYY'))).toBeInTheDocument()
  for (let day = startOfMonth; day <= endOfMonth; day = day.add(1, 'day')) {
    expect(screen.getByLabelText(day.format('DD MMM YYYY'))).toBeInTheDocument()
  }
})

test('shows calendar for previous month on "<" button click', async () => {
  const today = dayjs()

  render(<DatePicker allowClear />)
  fireEvent.click(screen.getByText(/select date/i))
  fireEvent.click(screen.getByLabelText('move to previous month'))

  await waitFor(() => {
    expect(
      screen.getByText(today.subtract(1, 'month').format('MMM YYYY')),
    ).toBeInTheDocument()
  })
})

test('shows calendar for previous year on "<<" button click', async () => {
  const today = dayjs()

  render(<DatePicker allowClear />)
  fireEvent.click(screen.getByText(/select date/i))
  fireEvent.click(screen.getByLabelText('move to previous year'))

  await waitFor(() => {
    expect(
      screen.getByText(today.subtract(1, 'year').format('MMM YYYY')),
    ).toBeInTheDocument()
  })
})

test('shows calendar for next month on ">" button click', async () => {
  const today = dayjs()

  render(<DatePicker allowClear />)
  fireEvent.click(screen.getByText(/select date/i))
  fireEvent.click(screen.getByLabelText('move to next month'))

  await waitFor(() => {
    expect(
      screen.getByText(today.add(1, 'month').format('MMM YYYY')),
    ).toBeInTheDocument()
  })
})

test('shows calendar for next year on ">>" button click', async () => {
  const today = dayjs()

  render(<DatePicker allowClear />)
  fireEvent.click(screen.getByText(/select date/i))
  fireEvent.click(screen.getByLabelText('move to next year'))

  await waitFor(() => {
    expect(
      screen.getByText(today.add(1, 'year').format('MMM YYYY')),
    ).toBeInTheDocument()
  })
})

test('calls onChange method on date change', () => {
  const today = dayjs()
  const onChange = jest.fn()

  render(<DatePicker allowClear onChange={onChange} />)
  fireEvent.click(screen.getByText(/select date/i))
  fireEvent.click(screen.getByLabelText(today.format('DD MMM YYYY')))

  expect(onChange).toBeCalled()
  expect(dayjs(onChange.mock.results[0].value).format('DD-MM-YYYY')).toBe(
    today.format('DD-MM-YYYY'),
  )
})
