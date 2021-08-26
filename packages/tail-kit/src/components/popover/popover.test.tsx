import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { Popover } from './popover'

test('toggles popover visibility on hover', async () => {
  render(
    <Popover title="Popover Title" content="Popover Content">
      <div>Trigger</div>
    </Popover>,
  )
  fireEvent.mouseEnter(screen.getByText(/trigger/i))
  expect(screen.getByText(/popover title/i)).toBeInTheDocument()
  expect(screen.getByText(/popover content/i)).toBeInTheDocument()
  fireEvent.mouseLeave(screen.getByText(/trigger/i))
  await waitForElementToBeRemoved(() => screen.getByText(/popover title/i))
})

test("doesn't close the popover on quickly hovering over the content", async () => {
  render(
    <Popover title="Popover Title" content="Popover Content">
      <div>Trigger</div>
    </Popover>,
  )
  fireEvent.mouseEnter(screen.getByText(/trigger/i))
  fireEvent.mouseLeave(screen.getByText(/trigger/i))
  fireEvent.mouseEnter(screen.getByText(/popover title/i))
  await waitFor(() => {
    expect(screen.getByText(/popover content/i)).toBeInTheDocument()
  })
})

test('toggles popover visibliby on click', async () => {
  render(
    <div>
      <Popover
        title="Popover Title"
        content="Popover Content"
        triggerEvent="click"
      >
        <div>Trigger</div>
      </Popover>
      <div>Outside Element</div>
    </div>,
  )
  fireEvent.click(screen.getByText(/trigger/i))
  expect(screen.getByText(/popover title/i)).toBeInTheDocument()
  expect(screen.getByText(/popover content/i)).toBeInTheDocument()
  // useOutsideClick hook listens for 'mousedown' event, so instead of using
  // fireEvent.click, we have to use fireEvent.mouseDown
  fireEvent.mouseDown(screen.getByText(/outside element/i))
  await waitForElementToBeRemoved(() => screen.getByText(/popover title/i))
})

test('calls onVisiblityChange when it behaves as a controlled component', () => {
  const onVisibilityChange = jest.fn()
  render(
    <Popover
      title="Popover Title"
      content="Popover Content"
      visible={false}
      onVisibilityChange={onVisibilityChange}
    >
      <div>Trigger</div>
    </Popover>,
  )
  fireEvent.mouseEnter(screen.getByText(/trigger/i))
  expect(onVisibilityChange).toBeCalledWith(true)
})

test('hideArrow prop should not render the Popover Arrow', () => {
  render(
    <Popover title="Popover Title" content="Popover Content" hideArrow>
      <div>Trigger</div>
    </Popover>,
  )
  fireEvent.mouseEnter(screen.getByText(/trigger/i))
  expect(screen.queryByTestId('popover-arrow')).toBeNull()
})
