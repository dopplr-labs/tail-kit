import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Radio } from './radio'
import { RadioGroup } from './radio-group'

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

test('disable property of radio does not trigger onChange', () => {
  const onChange = jest.fn((event) => event.target.checked)
  render(<Radio disabled label="Radio" onChange={onChange} />)
  fireEvent.click(screen.getByText('Radio'))
  expect(onChange).toBeCalledTimes(0)
})

test('renders radio without label correctly', () => {
  render(<Radio />)
  expect(screen.queryByTestId('label')).toBe(null)
})

test('renders error radio style correctly', () => {
  render(<Radio label="Radio" error checked />)
  expect(screen.getByText('Radio')).toHaveClass('text-red-700')
  expect(screen.getByText('Radio').parentElement?.firstChild).toHaveClass(
    'border-red-500',
  )
  expect(
    screen.getByText('Radio').parentElement?.firstChild?.firstChild,
  ).toHaveClass('bg-red-500')
})

test('forward ref to the radio', () => {
  const ref = createRef<HTMLInputElement>()
  render(<Radio label="Radio" ref={ref} />)
  expect(ref.current?.tagName).toBe('INPUT')
})

test('renders radio-group correctly with options as string[]', () => {
  render(<RadioGroup options={['Option A']} />)
  expect(screen.getByText('Option A')).toBeInTheDocument()
})

test('renders radio-group correctly with options as RadioOptions[]', () => {
  const options = [{ label: 'Option A', value: 'A' }]
  render(<RadioGroup options={options} />)
  expect(screen.getByText('Option A')).toBeInTheDocument()
})

test('onChange event of radio-group working correctly', () => {
  const options = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
  ]
  const onChange = jest.fn((checkedValue) => checkedValue)
  render(<RadioGroup options={options} defaultValue="A" onChange={onChange} />)
  fireEvent.click(screen.getByText('Option B'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual('B')
})

test('disable property of radio group working correctly', () => {
  const options = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
    { label: 'Option C', value: 'C', disabled: false },
  ]
  render(<RadioGroup disabled options={options} />)
  expect(screen.getByText('Option A').parentElement).toHaveClass(
    'text-gray-400',
  )
  expect(screen.getByText('Option C').parentElement).toHaveClass(
    'cursor-pointer',
  )
})
