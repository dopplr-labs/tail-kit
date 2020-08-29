import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

test('render button label correctly', () => {
  render(<Button label="Click Here" />)
  expect(screen.getByText('Click Here')).toBeInTheDocument()
})

test('renders primary button correctly', () => {
  render(<Button label="Click Here" buttonType={Button.ButtonType.primary} />)
  expect(
    screen.getByLabelText('Click Here').classList.contains('primary'),
  ).toBe(true)
})

test('renders default button correctly', () => {
  render(<Button label="Click Here" buttonType={Button.ButtonType.default} />)
  expect(
    screen.getByLabelText('Click Here').classList.contains('default'),
  ).toBe(true)
})

test('renders danger button correctly', () => {
  render(<Button label="Click Here" buttonType={Button.ButtonType.danger} />)
  expect(screen.getByLabelText('Click Here').classList.contains('danger')).toBe(
    true,
  )
})

test('renders link button correctly', () => {
  render(<Button label="Click Here" buttonType={Button.ButtonType.link} />)
  expect(screen.getByLabelText('Click Here').classList.contains('link')).toBe(
    true,
  )
})

test('render icon correctly', () => {
  const icon = <div className="icon" data-testid="icon" />
  render(<Button label="Click Here" icon={icon} />)
  expect(screen.getByTestId('icon')).toBeInTheDocument()
})

test('call onClick on button click', () => {
  const onClick = jest.fn()
  render(<Button label="Click Here" onClick={onClick} />)
  userEvent.click(screen.getByText('Click Here'))
  expect(onClick).toHaveBeenCalled()
})
