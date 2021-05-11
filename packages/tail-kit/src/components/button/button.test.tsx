import React, { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

test('render button label correctly', () => {
  render(<Button label="Click Here" />)
  expect(screen.getByText('Click Here')).toBeInTheDocument()
})

test('render aria label correctly by default', () => {
  render(<Button label="Click Here" />)
  expect(screen.getByLabelText('Click Here')).toBeInTheDocument()
})

test('render aria label correctly by default', () => {
  render(
    <Button aria-label="Click Here" icon={<div data-testid="button-icon" />} />,
  )
  expect(screen.getByLabelText('Click Here')).toBeInTheDocument()
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

test('forward ref to the button', () => {
  const ref = createRef<HTMLButtonElement>()
  render(<Button label="Click Here" ref={ref} />)
  expect(ref.current?.tagName).toBe('BUTTON')
})

test('render spinner on loading', () => {
  render(<Button label="Click Me" loading />)
  expect(screen.getByTestId('button-spinner')).toBeInTheDocument()
})

test('disables button on loading', () => {
  const onClick = jest.fn()

  render(<Button label="Click Me" loading onClick={onClick} />)
  userEvent.click(screen.getByText('Click Me'))
  expect(onClick).not.toHaveBeenCalled()
})

test('render icon before label by default', () => {
  render(<Button label="Click Me" icon={<div data-testid="button-icon" />} />)
  expect(screen.getByTestId('button-icon').nextSibling).toHaveTextContent(
    'Click Me',
  )
})

test('render icon after label when iconPlacement is afterLabel', () => {
  render(
    <Button
      label="Click Me"
      icon={<div data-testid="button-icon" />}
      iconPlacement={Button.IconPlacement.afterLabel}
    />,
  )
  expect(screen.getByTestId('button-icon').previousSibling).toHaveTextContent(
    'Click Me',
  )
})

test('render default disabled button correctly', () => {
  render(<Button label="Click Me" disabled />)
  expect(screen.getByRole('button')).toHaveClass(
    'border-gray-400 text-gray-400',
  )
})

test('render primary disabled button correctly', () => {
  render(
    <Button label="Click Me" disabled buttonType={Button.ButtonType.primary} />,
  )
  expect(screen.getByRole('button')).toHaveClass('bg-gray-400 text-white')
})

test('render danger disabled button correctly', () => {
  render(
    <Button
      label="Don't Click Me"
      disabled
      buttonType={Button.ButtonType.danger}
    />,
  )
  expect(screen.getByRole('button')).toHaveClass(
    'border-gray-400 text-gray-400',
  )
})

test('render link disabled button correctly', () => {
  render(
    <Button label="Click Me" disabled buttonType={Button.ButtonType.link} />,
  )
  expect(screen.getByRole('button')).toHaveClass('text-gray-400')
})
