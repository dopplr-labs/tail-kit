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
