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
