import React from 'react'
import { render, screen } from '@testing-library/react'
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
