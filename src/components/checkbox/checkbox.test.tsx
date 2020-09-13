import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Checkbox } from './checkbox'

test('renders checkbox label correctly', () => {
  let checked = false
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      onChange={() => {
        checked = !checked
      }}
    />,
  )
  expect(screen.getByText('Checkbox label')).toBeInTheDocument()
})

test('onChange event of Checkbox working correctly', () => {
  let checked = false
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      onChange={() => (checked = !checked)}
    />,
  )
  fireEvent.click(screen.getByText('Checkbox label'))
  expect(checked).toBe(true)
})

test('renders checkbox icon container style correctly', () => {
  let checked = true
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      onChange={() => (checked = !checked)}
    />,
  )
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild,
  ).toHaveClass('bg-blue-500')
})

test('renders indeterminate state correctly', () => {
  let checked: boolean | 'indeterminate' = 'indeterminate'
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      onChange={() =>
        checked === 'indeterminate'
          ? (checked = true)
          : checked === true
          ? (checked = false)
          : (checked = true)
      }
    />,
  )
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild?.firstChild,
  ).toHaveClass('bg-blue-500')
})

test('renders error checkbox style correctly', () => {
  let checked = true
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      error={true}
      onChange={() => (checked = !checked)}
    />,
  )
  expect(screen.getByText('Checkbox label')).toHaveClass('text-red-500')
})

test('renders disabled checkbox correctly', () => {
  let checked = true
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      disabled
      onChange={() => (checked = !checked)}
    />,
  )
  expect(screen.getByText('Checkbox label').parentElement).toHaveClass(
    'text-gray-400',
  )
})

test('renders style of disabled checkbox correctly', () => {
  let checked = false
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      disabled
      onChange={() => (checked = !checked)}
    />,
  )
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild,
  ).toHaveClass('bg-gray-100')
})

test('renders checkbox without label correctly', () => {
  let checked = false
  render(<Checkbox checked={checked} onChange={() => (checked = !checked)} />)
  expect(screen.queryByTestId('label')).toBe(null)
})
