import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './button'

test('render button label correctly', () => {
  render(<Button>Click Here</Button>)
  expect(screen.getByText('Click Here')).toBeInTheDocument()
})
