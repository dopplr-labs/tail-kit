import React, { useMemo } from 'react'
import Button from 'components/button'
import { Meta } from '@storybook/react/types-6-0'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
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
    <Button
      label="Display Simple Message"
      buttonType={Button.ButtonType.primary}
      onClick={showToast}
    />
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
      <Button label="Success" onClick={success} />
      <Button label="Warning" onClick={warning} />
      <Button label="Error" onClick={error} />
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

  return <Button label="Custom Dismiss Time" onClick={success} />
}

export function DispalyLoadingIndicator() {
  const { message } = useMessage()

  const loading = () => {
    message.loading('Saving changes. Please wait!!')
  }

  return <Button label="Display Loading Indicator" onClick={loading} />
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
  return <Button label="Message with custom icon" onClick={renderMessage} />
}
