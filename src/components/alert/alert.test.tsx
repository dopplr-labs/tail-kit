import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Alert } from './alert'

test('render alert title correctly', () => {
  render(<Alert title="Alert Title" />)
  expect(screen.getByText('Alert Title')).toBeInTheDocument()
})

test('render alert content correctly', () => {})

test('render info icon correctly', () => {})

test('render error icon correctly', () => {})

test('renders custom icon correctly', () => {
  render(<Alert title="Alert Title" icon={<div data-testid="custom-icon" />} />)
  expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
})

test('class onClose on close button click', () => {
  const onClose = jest.fn()
  render(<Alert title="Alert Title" onClose={onClose} closable />)
  fireEvent.click(screen.getByRole('button'))
  expect(onClose).toHaveBeenCalled()
})
