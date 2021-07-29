import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from './switch'

test('toggles to ON state correctly', () => {
  const onChange = jest.fn()
  render(<Switch onChange={(event) => onChange(event.target.checked)} />)
  userEvent.click(screen.getByTestId('toggle-thumb'))
  expect(onChange).toHaveBeenCalledWith(true)
})

test('toggles to OFF state correctly', () => {
  const onChange = jest.fn()
  render(
    <Switch
      onChange={(event) => onChange(event.target.checked)}
      checked={true}
    />,
  )
  userEvent.click(screen.getByTestId('toggle-thumb'))
  expect(onChange).toHaveBeenCalledWith(false)
})
