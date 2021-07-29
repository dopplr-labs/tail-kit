import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import range from 'utils/range'
import Pagination from '.'

test('pagination component working correctly', () => {
  render(<Pagination total={50} />)
  expect(screen.getByText('1')).toBeInTheDocument()
})

test('Next button of pagination component working correctly', () => {
  render(<Pagination total={50} />)
  expect(screen.getByText('1').parentElement).toHaveClass('bg-blue-600')
  fireEvent.click(screen.getByText('Next'))
  expect(screen.getByText('2').parentElement).toHaveClass('bg-blue-600')
})

test('Previous button of pagination component working correctly', () => {
  render(<Pagination total={50} defaultCurrent={3} />)
  expect(screen.getByText('3').parentElement).toHaveClass('bg-blue-600')
  fireEvent.click(screen.getByText('Previous'))
  expect(screen.getByText('2').parentElement).toHaveClass('bg-blue-600')
})

test('Page buttons of pagination component working correctly', () => {
  render(<Pagination total={50} />)
  expect(screen.getByText('1').parentElement).toHaveClass('bg-blue-600')
  fireEvent.click(screen.getByText('3'))
  expect(screen.getByText('3').parentElement).toHaveClass('bg-blue-600')
})

/** Tests for page size changer in pagination component */
test('Page size changer of pagination component working correctly', () => {
  render(<Pagination total={100} showSizeChanger />)
  expect(screen.getByText('10')).toBeInTheDocument()
  fireEvent.click(screen.getByText('10 / page'))
  fireEvent.click(screen.getByText('20 / page'))
  expect(screen.queryByText('10')).toBe(null)
})

test('Change selected page when value of total number of pages changes', () => {
  render(<Pagination total={100} showSizeChanger defaultCurrent={10} />)
  fireEvent.click(screen.getByText('10 / page'))
  fireEvent.click(screen.getByText('20 / page'))
  expect(screen.getByText('5').parentElement).toHaveClass('bg-blue-600')
})

/** Tests for page jumper */
test('Page jumper of pagination component working correctly', () => {
  render(<Pagination total={50} showQuickJumper />)
  userEvent.type(screen.getByRole('textbox'), '3')
  fireEvent.blur(screen.getByDisplayValue('3'))
  expect(screen.getByText('3').parentElement).toHaveClass('bg-blue-600')
})

test('Out of range value in page jumper working correctly', () => {
  render(<Pagination total={50} defaultCurrent={3} showQuickJumper />)
  userEvent.type(screen.getByRole('textbox'), '-1')
  fireEvent.blur(screen.getByDisplayValue('-1'))
  expect(screen.getByText('1').parentElement).toHaveClass('bg-blue-600')

  userEvent.type(screen.getByRole('textbox'), '10')
  fireEvent.blur(screen.getByDisplayValue('10'))
  expect(screen.getByText('5').parentElement).toHaveClass('bg-blue-600')
})

test('Enter key shortcut for page jumper working correctly', () => {
  render(<Pagination total={100} showQuickJumper />)
  const input = screen.getByRole('textbox')
  userEvent.type(input, '5')
  fireEvent.keyDown(input, { key: 'Enter', code: 13 })
  expect(screen.getByText('5').parentElement).toHaveClass('bg-blue-600')
})

test('invalid entries in page jumper working correctly', () => {
  render(<Pagination total={100} defaultCurrent={5} showQuickJumper />)
  const input = screen.getByRole('textbox')
  userEvent.type(input, 'abc')
  fireEvent.keyDown(input, { key: 'Enter', code: 13 })
  expect(screen.getByText('5').parentElement).toHaveClass('bg-blue-600')
})

/** Test cases for page wrap in pagination component */
test('No breakview for total pages upto 7', () => {
  render(<Pagination total={70} />)
  expect(screen.queryByText('...')).not.toBeInTheDocument()
})

test('Breakview exists when total pages are greater than 7', () => {
  render(<Pagination total={100} />)
  expect(screen.queryByText('...')).toBeInTheDocument()
  range(1, 11).forEach((page) => {
    if (page > 5 && page < 9) {
      expect(screen.queryByText(page.toString())).not.toBeInTheDocument()
    } else {
      expect(screen.queryByText(page.toString())).toBeInTheDocument()
    }
  })
})

test('Page wrap on both side working correclty', () => {
  render(<Pagination total={500} defaultCurrent={10} />)
  range(1, 51).forEach((page) => {
    if ((page > 2 && page < 8) || (page > 12 && page < 49)) {
      expect(screen.queryByText(page.toString())).not.toBeInTheDocument()
    } else {
      expect(screen.queryByText(page.toString())).toBeInTheDocument()
    }
  })

  fireEvent.click(screen.getByText('12'))
  range(1, 51).forEach((page) => {
    if ((page > 2 && page < 10) || (page > 14 && page < 49)) {
      expect(screen.queryByText(page.toString())).not.toBeInTheDocument()
    } else {
      expect(screen.queryByText(page.toString())).toBeInTheDocument()
    }
  })
})

test('Breakview on the left side working correctly', () => {
  render(<Pagination total={500} defaultCurrent={49} />)
  range(1, 51).forEach((page) => {
    if (page > 2 && page < 45) {
      expect(screen.queryByText(page.toString())).not.toBeInTheDocument()
    } else {
      expect(screen.queryByText(page.toString())).toBeInTheDocument()
    }
  })
})

test('Breakview vanishes when total pages become less than 8', () => {
  render(<Pagination total={100} showSizeChanger />)
  expect(screen.getByText('...')).toBeInTheDocument()
  fireEvent.click(screen.getByText('10 / page'))
  fireEvent.click(screen.getByText('20 / page'))
  expect(screen.queryByText('...')).not.toBeInTheDocument()
})
