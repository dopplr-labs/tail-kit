import React, { useState } from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from 'components/button'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { MessageProvider, MessageTypes, useMessage } from './message'

type RenderButtonProps = {
  type?: MessageTypes
  messageContent?: string
  dismissTime?: number
  icon?: React.ReactElement
}

function renderInMessageProvider(children: React.ReactElement) {
  return render(<MessageProvider>{children}</MessageProvider>)
}

function RenderButton({
  type = MessageTypes.INFO,
  messageContent = 'Hello World',
  dismissTime = 10000,
  icon,
}: RenderButtonProps) {
  const { message, removeMessage } = useMessage()
  const [messageId, setMessageId] = useState('')

  const renderMessage = () => {
    const id = message[type](messageContent, { dismissTime, icon })
    setMessageId(id)
  }

  const deleteMessage = () => {
    removeMessage(messageId)
  }

  return (
    <>
      <Button onClick={renderMessage}>Click Me</Button>
      <Button onClick={deleteMessage}>Delete Message</Button>
    </>
  )
}

test('render content inside message correctly', () => {
  renderInMessageProvider(<RenderButton />)
  userEvent.click(screen.getByText('Click Me'))
  expect(screen.getByText('Hello World')).toBeInTheDocument()
})

test('render success variant of message correctly', () => {
  renderInMessageProvider(<RenderButton type={MessageTypes.SUCCESS} />)
  userEvent.click(screen.getByText('Click Me'))
  expect(screen.getByText('Hello World')).toBeInTheDocument()
  expect(screen.getByText('Hello World').parentElement?.firstChild).toHaveClass(
    'text-green-500',
  )
})

test('render warning variant of message correctly', () => {
  renderInMessageProvider(<RenderButton type={MessageTypes.WARNING} />)
  userEvent.click(screen.getByText('Click Me'))
  expect(screen.getByText('Hello World')).toBeInTheDocument()
  expect(screen.getByText('Hello World').parentElement?.firstChild).toHaveClass(
    'text-yellow-300',
  )
})

test('render error variant of message correctly', () => {
  renderInMessageProvider(<RenderButton type={MessageTypes.ERROR} />)
  userEvent.click(screen.getByText('Click Me'))
  expect(screen.getByText('Hello World')).toBeInTheDocument()
  expect(screen.getByText('Hello World').parentElement?.firstChild).toHaveClass(
    'text-red-500',
  )
})

test('render loading variant of message correctly', () => {
  renderInMessageProvider(<RenderButton type={MessageTypes.LOADING} />)
  userEvent.click(screen.getByText('Click Me'))
  expect(screen.getByText('Hello World')).toBeInTheDocument()
  expect(screen.getByText('Hello World').parentElement?.firstChild).toHaveClass(
    'text-gray-500',
  )
})

test('removeMessage function working correctly', async () => {
  renderInMessageProvider(<RenderButton />)
  userEvent.click(screen.getByText('Click Me'))
  expect(screen.getByText('Hello World')).toBeInTheDocument()
  userEvent.click(screen.getByText('Delete Message'))
  await waitForElementToBeRemoved(() => screen.queryByText('Hello World'))
})

test('message is being removed automatically', async () => {
  renderInMessageProvider(<RenderButton dismissTime={500} />)
  userEvent.click(screen.getByText('Click Me'))
  expect(screen.getByText('Hello World')).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.queryByText('Hello World'))
})

test('custom icon renders correctly', () => {
  const icon = (
    <div className="text-green-500">
      <HiOutlineCurrencyRupee />
    </div>
  )

  renderInMessageProvider(<RenderButton icon={icon} />)
  userEvent.click(screen.getByText('Click Me'))
  expect(screen.getByText('Hello World')).toBeInTheDocument()
  expect(screen.getByText('Hello World').parentElement?.firstChild).toHaveClass(
    'text-green-500',
  )
})
