import React, { createRef } from 'react'
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

test('forward ref to the radio', () => {
  const ref = createRef<HTMLInputElement>()
  render(<Radio label="Radio" ref={ref} />)
  expect(ref.current?.tagName).toBe('INPUT')
})

test('renders radio-group correctly with options as string[]', () => {
  render(<Radio.RadioGroup options={['Option A']} />)
  expect(screen.getByText('Option A')).toBeInTheDocument()
})

test('renders radio-group correctly with options as RadioOptions[]', () => {
  const options = [{ label: 'Option A', value: 'A' }]
  render(<Radio.RadioGroup options={options} />)
  expect(screen.getByText('Option A')).toBeInTheDocument()
})

test('onChange event of radio-group working correctly', () => {
  const options = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
  ]
  const onChange = jest.fn((checkedValue) => checkedValue)
  render(
    <Radio.RadioGroup options={options} defaultValue="A" onChange={onChange} />,
  )
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
  render(<Radio.RadioGroup disabled options={options} />)
  expect(screen.getByText('Option A').parentElement).toHaveClass(
    'text-gray-400',
  )
  expect(screen.getByText('Option C').parentElement).toHaveClass(
    'cursor-pointer',
  )
})
