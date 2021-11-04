import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InputNumber } from './input-number'

test('renders InputNumber component correctly', () => {
  render(<InputNumber defaultValue={3.5} />)
  expect(screen.getByDisplayValue('3.5')).toBeInTheDocument()
})

test('increment button working correctly', () => {
  render(<InputNumber defaultValue={1} step={0.01} precision={3} />)
  fireEvent.click(screen.getAllByRole('button')[0])
  expect(screen.getByTestId('input-number')).toHaveValue(1.01)
})

test('decrement button working correctly', () => {
  render(<InputNumber defaultValue={1} step={0.01} precision={3} />)
  fireEvent.click(screen.getAllByRole('button')[1])
  expect(screen.getByTestId('input-number')).toHaveValue(0.99)
})

test('onChange of input working correctly', () => {
  const onChange = jest.fn((value) => value)
  render(<InputNumber min={0} max={10} onChange={onChange} />)
  userEvent.type(screen.getByTestId('input-number'), '1.25')
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[3].value).toBe(1.25)
  expect(screen.getByTestId('input-number')).toHaveValue(1.25)
})
