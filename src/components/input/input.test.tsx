import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

test('render input correctly', () => {
  render(<Input placeholder="Email" />)
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
})

test('render icon correctly', () => {
  const icon = <div className="icon" data-testid="icon" />
  render(<Input placeholder="Email" icon={icon} />)
  expect(screen.getByTestId('icon')).toBeInTheDocument()
})

test('fowards ref correctly to input element', () => {
  const ref = React.createRef<HTMLInputElement>()
  render(<Input placeholder="Email" ref={ref} />)
  expect(ref.current?.tagName).toBe('INPUT')
  expect(ref.current?.placeholder).toMatch(/email/i)
})

test('onChange working correctly', () => {
  const onChange = jest.fn((event) => event.target.value)
  const str = 'Hello World'
  render(<Input onChange={onChange} />)
  userEvent.type(screen.getByRole('textbox'), str)
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[str.length - 1].value).toBe('Hello World')
})

test('Adding text correctly', () => {
  render(<Input />)
  userEvent.type(screen.getByRole('textbox'), 'Hello World')
  expect(screen.getByRole('textbox')).toHaveValue('Hello World')
})
