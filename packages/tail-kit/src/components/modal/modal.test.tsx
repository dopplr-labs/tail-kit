import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './modal'

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children)
  const FakeCSSTransition = jest.fn((props) => {
    if (props.in && props.onEnter) {
      props.onEnter()
    } else if (!props.in && props.onExited) {
      props.onExited()
    }
    return props.in ? <FakeTransition>{props.children}</FakeTransition> : null
  })
  return { CSSTransition: FakeCSSTransition, Transition: FakeTransition }
})

test('render children correctly', () => {
  render(
    <Modal visible>
      <div>Modal Content</div>
    </Modal>,
  )
  expect(screen.getByText('Modal Content')).toBeInTheDocument()
})

test('render title correctly', () => {
  render(
    <Modal visible title="Modal Title">
      <div />
    </Modal>,
  )
  expect(screen.getByText('Modal Title')).toBeInTheDocument()
})

test('removes the modal content from dom after onmount', () => {
  render(
    <Modal>
      <div>Modal Content</div>
    </Modal>,
  )
  expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
})

test('closes the modal on overlay click', () => {
  const onRequestClose = jest.fn()
  render(
    <Modal visible onRequestClose={onRequestClose}>
      <div>Modal Content</div>
    </Modal>,
  )
  userEvent.click(screen.getByTestId('modal-overlay'))
  expect(onRequestClose).toBeCalled()
})

test('closes the modal on close button click', () => {
  const onRequestClose = jest.fn()
  render(
    <Modal visible onRequestClose={onRequestClose} closable actions={false}>
      <div>Modal Content</div>
    </Modal>,
  )
  userEvent.click(screen.getByRole('button'))
  expect(onRequestClose).toBeCalled()
})

test('render custom title on modal', () => {
  render(
    <Modal visible title={<p className="text-red-500">Modal Title</p>}>
      <div />
    </Modal>,
  )
  expect(screen.getByText('Modal Title')).toHaveClass('text-red-500')
})

test('using maxWidth "md" to change modal width working correctly', () => {
  render(
    <Modal visible maxWidth="md">
      <div />
    </Modal>,
  )
  expect(screen.getByRole('dialog')).toHaveClass('max-w-screen-md')
})

test('using maxWidth "lg" to change modal width working correctly', () => {
  render(
    <Modal visible maxWidth="lg">
      <div />
    </Modal>,
  )
  expect(screen.getByRole('dialog')).toHaveClass('max-w-screen-lg')
})

test('using maxWidth "xl" to change modal width working correctly', () => {
  render(
    <Modal visible maxWidth="xl">
      <div />
    </Modal>,
  )
  expect(screen.getByRole('dialog')).toHaveClass('max-w-screen-xl')
})

test('using maxWidth "2xl" to change modal width working correctly', () => {
  render(
    <Modal visible maxWidth="2xl">
      <div />
    </Modal>,
  )
  expect(screen.getByRole('dialog')).toHaveClass('max-w-screen-2xl')
})
