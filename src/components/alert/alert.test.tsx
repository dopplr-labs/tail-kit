import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Alert, AlertType } from './alert'
import { ButtonType } from './alert-button'

test('render alert title correctly', () => {
  render(<Alert title="Alert Title" />)
  expect(screen.getByText('Alert Title')).toBeInTheDocument()
})

test('render alert content correctly', () => {
  render(<Alert title="Alert Title" content={<span>Alert Content</span>} />)
  expect(screen.getByText('Alert Content')).toBeInTheDocument()
})

test('render info icon correctly', () => {
  render(<Alert title="Alert Title" />)
  expect(screen.getByTestId('info-icon')).toBeInTheDocument()
})

test('render success icon correctly', () => {
  render(<Alert type={AlertType.success} title="Order Placed" />)
  expect(screen.getByTestId('success-icon')).toBeInTheDocument()
})

test('render warning icon correctly', () => {
  render(<Alert type={AlertType.warning} title="Attention needed" />)
  expect(screen.getByTestId('warning-icon')).toBeInTheDocument()
})

test('render error icon correctly', () => {
  render(
    <Alert
      type={AlertType.error}
      title="There are 2 errors in your form submission"
    />,
  )
  expect(screen.getByTestId('error-icon')).toBeInTheDocument()
})

test('renders custom icon correctly', () => {
  render(<Alert title="Alert Title" icon={<div data-testid="custom-icon" />} />)
  expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
})

test('calls onClose on close button click', () => {
  const onClose = jest.fn()
  render(<Alert title="Alert Title" onClose={onClose} closable />)
  fireEvent.click(screen.getByRole('button'))
  expect(onClose).toHaveBeenCalled()
})

test('renders appropriate color based on alert type', () => {
  render(<Alert title="Alert Title" />)
  expect(screen.getByText('Alert Title').parentElement).toHaveClass(
    'text-blue-700',
  )
})

test('renders without any icon correctly ', () => {
  render(<Alert icon={false} title="Alert Title" />)
  expect(screen.getByTestId('icon').firstChild).toBeNull()
})

test('renders actions correctly', () => {
  render(
    <Alert
      type={AlertType.warning}
      title="Attention needed"
      content="Your trial period has already completed. Add your payment detials to continue using Indshine"
      actions={
        <>
          <Alert.AlertButton label="Pay Now" />
        </>
      }
    />,
  )
  expect(screen.getByText('Pay Now')).toBeInTheDocument()
})

test('renders actions button background correctly', () => {
  render(
    <Alert
      type={AlertType.warning}
      title="Attention needed"
      content="Your trial period has already completed. Add your payment detials to continue using Indshine"
      actions={
        <>
          <Alert.AlertButton label="Pay Now" buttonType={ButtonType.primary} />
        </>
      }
    />,
  )
  expect(screen.getByText('Pay Now').parentElement).toHaveClass(
    'alert-button-primary-yellow',
  )
})
