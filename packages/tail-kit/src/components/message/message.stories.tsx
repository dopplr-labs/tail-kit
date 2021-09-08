import React, { useMemo } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import Button from '../button'
import { MessageProvider, useMessage } from './message'

export default {
  title: 'Feedback/Message',
  component: MessageProvider,
  decorators: [
    (Story) => (
      <MessageProvider>
        <Story />
      </MessageProvider>
    ),
  ],
} as Meta

export function NormalMessage() {
  const { message } = useMessage()

  function showToast() {
    message.info('This is a normal message')
  }

  return (
    <Button buttonType="primary" onClick={showToast}>
      Display Simple Message
    </Button>
  )
}

export function DifferentTypesOfMessages() {
  const { message } = useMessage()

  function success() {
    message.success('This is a success message')
  }

  function warning() {
    message.warning('This is a warning message')
  }

  function error() {
    message.error('This is an error message')
  }

  return (
    <div className="flex items-center space-x-4">
      <Button onClick={success}>Success</Button>
      <Button onClick={warning}>Warning</Button>
      <Button onClick={error}>Error</Button>
    </div>
  )
}

export function CustomDismissTime() {
  const { message } = useMessage()

  const success = () => {
    message.success(
      'This is a prompt message for success, and it will disappear in 10 seconds',
      { dismissTime: 10000 },
    )
  }

  return <Button onClick={success}>Custom Dismiss Time</Button>
}

export function DispalyLoadingIndicator() {
  const { message } = useMessage()

  const loading = () => {
    message.loading('Saving changes. Please wait!!')
  }

  return <Button onClick={loading}>Display Loading Indicator</Button>
}

export function MessageWithCustomIcon() {
  const { message } = useMessage()

  const icon = useMemo(
    () => (
      <div className="text-green-500">
        <HiOutlineCurrencyRupee />
      </div>
    ),
    [],
  )

  const renderMessage = () => {
    message.info('You will recieve refund in 5-7 days!!!', {
      icon,
    })
  }
  return <Button onClick={renderMessage}>Message with custom icon</Button>
}
