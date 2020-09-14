import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Checkbox } from './checkbox'

test('renders checkbox label correctly', () => {
  render(
    <Checkbox
      label="Checkbox label"
      onChange={(event) => {
        event?.target.checked
      }}
    />,
  )
  expect(screen.getByText('Checkbox label')).toBeInTheDocument()
})

test('onChange event of Checkbox working correctly', () => {
  const onChange = jest.fn((event) => event.target.checked)
  render(<Checkbox label="Checkbox label" onChange={onChange} />)
  fireEvent.click(screen.getByText('Checkbox label'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toBe(true)
})

test('renders checkbox icon container style correctly', () => {
  let checked = true
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      onChange={(event) => {
        checked = event?.target.checked
      }}
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
      onChange={(event) => {
        checked = event?.target.checked
      }}
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
      onChange={(event) => {
        checked = event?.target.checked
      }}
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
      onChange={(event) => {
        checked = event?.target.checked
      }}
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
      disabled
      checked={checked}
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild,
  ).toHaveClass('bg-gray-100')
})

test('renders checkbox without label correctly', () => {
  let checked = false
  render(
    <Checkbox
      checked={checked}
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(screen.queryByTestId('label')).toBe(null)
})

test('forward red to the checkbox', () => {
  const ref = createRef<HTMLInputElement>()
  let checked = false
  render(
    <Checkbox
      checked={checked}
      label="Checkbox label"
      ref={ref}
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(ref.current?.tagName).toBe('INPUT')
})
