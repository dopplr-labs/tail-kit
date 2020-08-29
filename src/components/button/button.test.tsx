import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './button'

test('render button label correctly', () => {
  render(<Button label="Click Here" />)
  expect(screen.getByText('Click Here')).toBeInTheDocument()
})
