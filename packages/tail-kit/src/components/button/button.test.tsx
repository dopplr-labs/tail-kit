import React, { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

test('render button label correctly', () => {
  render(<Button>Click Here</Button>)
  expect(screen.getByText('Click Here')).toBeInTheDocument()
})

test('render aria label correctly by default', () => {
  render(<Button>Click Here</Button>)
  expect(screen.getByLabelText('Click Here')).toBeInTheDocument()
})

test('render aria label correctly by default', () => {
  render(
    <Button aria-label="Click Here" icon={<div data-testid="button-icon" />} />,
  )
  expect(screen.getByLabelText('Click Here')).toBeInTheDocument()
})

test('renders primary button correctly', () => {
  render(<Button buttonType="primary">Click Here</Button>)
  expect(
    screen.getByLabelText('Click Here').classList.contains('primary'),
  ).toBe(true)
})

test('renders default button correctly', () => {
  render(<Button buttonType="default">Click Here</Button>)
  expect(
    screen.getByLabelText('Click Here').classList.contains('default'),
  ).toBe(true)
})

test('renders danger button correctly', () => {
  render(<Button buttonType="danger">Click Here</Button>)
  expect(screen.getByLabelText('Click Here').classList.contains('danger')).toBe(
    true,
  )
})

test('renders link button correctly', () => {
  render(<Button buttonType="link">Click Here</Button>)
  expect(screen.getByLabelText('Click Here').classList.contains('link')).toBe(
    true,
  )
})

test('render icon correctly', () => {
  const icon = <div className="icon" data-testid="icon" />
  render(<Button icon={icon}>Click Here</Button>)
  expect(screen.getByTestId('icon')).toBeInTheDocument()
})

test('call onClick on button click', () => {
  const onClick = jest.fn()
  render(<Button onClick={onClick}>Click Here</Button>)
  userEvent.click(screen.getByText('Click Here'))
  expect(onClick).toHaveBeenCalled()
})

test('forward ref to the button', () => {
  const ref = createRef<HTMLButtonElement>()
  render(<Button ref={ref}>Click Here</Button>)
  expect(ref.current?.tagName).toBe('BUTTON')
})

test('render spinner on loading', () => {
  render(<Button loading>Click Me</Button>)
  expect(screen.getByTestId('button-spinner')).toBeInTheDocument()
})

test('disables button on loading', () => {
  const onClick = jest.fn()

  render(
    <Button loading onClick={onClick}>
      Click Me
    </Button>,
  )
  userEvent.click(screen.getByText('Click Me'))
  expect(onClick).not.toHaveBeenCalled()
})

test('render icon before label by default', () => {
  render(<Button icon={<div data-testid="button-icon" />}>Click Me</Button>)
  expect(screen.getByTestId('button-icon').nextSibling).toHaveTextContent(
    'Click Me',
  )
})

test('render icon after label when iconPlacement is afterText', () => {
  render(
    <Button icon={<div data-testid="button-icon" />} iconPlacement="afterText">
      Click Me
    </Button>,
  )
  expect(screen.getByTestId('button-icon').previousSibling).toHaveTextContent(
    'Click Me',
  )
})

test('render default disabled button correctly', () => {
  render(<Button disabled>Click Me</Button>)
  expect(screen.getByRole('button')).toHaveClass(
    'border-disabled text-disabled',
  )
})

test('render primary disabled button correctly', () => {
  render(
    <Button disabled buttonType="primary">
      Click Me
    </Button>,
  )
  expect(screen.getByRole('button')).toHaveClass(
    'bg-disabled text-text-inverse',
  )
})

test('render danger disabled button correctly', () => {
  render(
    <Button disabled buttonType="danger">
      Don&apos;t Click Me
    </Button>,
  )
  expect(screen.getByRole('button')).toHaveClass(
    'border-disabled text-disabled',
  )
})

test('render link disabled button correctly', () => {
  render(
    <Button disabled buttonType="link">
      Click Me
    </Button>,
  )
  expect(screen.getByRole('button')).toHaveClass('text-disabled')
})
