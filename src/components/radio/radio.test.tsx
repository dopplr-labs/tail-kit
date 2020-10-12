import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Radio } from './radio'

test('renders radio label correctly', () => {
  render(<Radio label="Radio" />)
  expect(screen.getByText('Radio')).toBeInTheDocument()
})

test('selection for radio working correctly', () => {
  const onChange = jest.fn((event) => event.target.checked)
  render(<Radio label="Radio" onChange={onChange} />)
  fireEvent.click(screen.getByText('Radio'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toBe(true)
})

test('disable property of radio working correctly', () => {
  render(<Radio disabled label="Radio" checked />)
  expect(screen.getByText('Radio').parentElement).toHaveClass('text-gray-400')
  expect(screen.getByText('Radio').parentElement?.firstChild).toHaveClass(
    'border-gray-400',
  )
})

test('renders radio without label correctly', () => {
  render(<Radio />)
  expect(screen.queryByTestId('label')).toBe(null)
})
