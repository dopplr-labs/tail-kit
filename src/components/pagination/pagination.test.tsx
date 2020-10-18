import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
