import React from 'react'
import Button from 'components/button'
import { Meta } from '@storybook/react/types-6-0'
import { ToastProvider, useToasts } from './toast'

export default {
  title: 'Feedback/Message',
  component: ToastProvider,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} as Meta

export function NormalMessage() {
  const { toast } = useToasts()

  function showToast() {
    toast.info('This is a normal message')
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
  const { toast } = useToasts()

  function success() {
    toast.success('This is a success message')
  }

  function warning() {
    toast.warning('This is a warning message')
  }

  function error() {
    toast.error('This is an error message')
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
  const { toast } = useToasts()

  const success = () => {
    toast.success(
      'This is a prompt message for success, and it will disappear in 10 seconds',
      10000,
    )
  }

  return <Button label="Custom Dismmis Time" onClick={success} />
}
