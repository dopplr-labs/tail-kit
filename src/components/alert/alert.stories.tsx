import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BookmarkSolid } from 'components/icons'
import { Alert, AlertType, ButtonType } from './alert'

export default { title: 'Feedback/Alert', component: Alert } as Meta

export function InfoAlert() {
  return <Alert title="Some additional information" />
}

export function SuccessAlert() {
  const title = 'Order placed'
  const content =
    'Lorem ipsum dolor sit amet consectetur adipsicing elit. Aliquid pariatur, ipsum similique veniam.'
  return <Alert type={AlertType.success} title={title} content={content} />
}

export function WarningAlert() {
  const content =
    'Lorem ipsum dolor sit amet consectetur adipsicing elit. Aliquid pariatur, ipsum similique veniam.'
  return (
    <Alert
      type={AlertType.warning}
      title="Attention needed"
      content={content}
    />
  )
}

export function ErrorAlert() {
  const title = 'There were 2 errors with your submission'
  const content = (
    <ul className="list-disc">
      <li>Your password must be at least 8 characters</li>
      <li>
        Your password must included at least one pro wrestling finishing move
      </li>
    </ul>
  )
  return <Alert type={AlertType.error} title={title} content={content} />
}

export function AlertWithOnlyTitle() {
  return (
    <Alert
      closable
      icon={false}
      title="The quick, brown fox jumps over a lazy dog."
    />
  )
}

export function AlertWithCustomIcon() {
  return (
    <Alert
      type={AlertType.success}
      icon={<BookmarkSolid className="w-6 h-6 mr-2 text-green-500" />}
      title="This webpage is now bookmarked"
    />
  )
}

export function AlertWithAction() {
  return (
    <Alert
      title="How about some action"
      actions={
        <>
          <Alert.AlertButton label="OK" type={ButtonType.primary} />
          <Alert.AlertButton label="Ignore" />
        </>
      }
    />
  )
}
