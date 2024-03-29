import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../button'
import { Drawer } from './drawer'

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

test('render content inside drawer correctly', () => {
  render(
    <Drawer visible>
      <p>Some Contents...</p>
    </Drawer>,
  )
  expect(screen.getByText('Some Contents...')).toBeInTheDocument()
})

test('render title correctly', () => {
  render(
    <Drawer visible title="Drawer Title">
      <div />
    </Drawer>,
  )
  expect(screen.getByText('Drawer Title')).toBeInTheDocument()
})

test('removes the drawer content from dom after unmount', () => {
  render(
    <Drawer visible={false}>
      <p>Some Contents...</p>
    </Drawer>,
  )
  expect(screen.queryByText('Some Contents...')).not.toBeInTheDocument()
})

test('closes the drawer on overlay click', () => {
  const onRequestClose = jest.fn()
  render(
    <Drawer visible onRequestClose={onRequestClose}>
      <p>Some Contents...</p>
    </Drawer>,
  )
  userEvent.click(screen.getByTestId('drawer-overlay'))
  expect(onRequestClose).toBeCalled()
})

test('close button of drawer working correctly', () => {
  const onRequestClose = jest.fn()
  render(
    <Drawer visible onRequestClose={onRequestClose} closable>
      <p>Some Contents...</p>
    </Drawer>,
  )
  userEvent.click(screen.getByRole('button'))
  expect(onRequestClose).toBeCalled()
})

test('footer inside drawer renders correctly', () => {
  render(
    <Drawer visible footer={<Button>Cancel</Button>}>
      <p>Some Contents...</p>
    </Drawer>,
  )
  expect(screen.getByText('Cancel')).toBeInTheDocument()
})
