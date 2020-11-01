import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react'
import { Tooltip } from './tooltip'

test('toggles tooltip title on hovering over trigger', async () => {
  render(
    <Tooltip title="Tooltip Content">
      <div>Trigger</div>
    </Tooltip>,
  )
  fireEvent.mouseEnter(screen.getByText('Trigger'))
  expect(screen.getByText('Tooltip Content')).toBeInTheDocument()
  fireEvent.mouseLeave(screen.getByText('Trigger'))
  await waitForElementToBeRemoved(() => screen.getByText('Tooltip Content'))
})

test("doesn't close the tooltip on quickly hovering over the tooltip", async () => {
  render(
    <Tooltip title="Tooltip Content">
      <div>Trigger</div>
    </Tooltip>,
  )
  fireEvent.mouseEnter(screen.getByText('Trigger'))
  fireEvent.mouseEnter(screen.getByText('Tooltip Content'))
  await waitFor(() => {
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument()
  })
})
