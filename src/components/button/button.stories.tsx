import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from './button'

export default {
  title: 'components/button',
  component: Button,
} as Meta

export function DefaultButton() {
  return <Button label="Login" />
}

export function DefaultButtonWithIcon() {
  return (
    <Button
      label="Update Password"
      icon={
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 shield-check"
        >
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      }
    />
  )
}

export function DefaultIconButton() {
  return (
    <Button
      icon={
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 plus">
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      }
    />
  )
}

export function PrimaryButton() {
  return (
    <Button buttonType={Button.ButtonType.primary} label="Create Account" />
  )
}

export function PrimaryButtonWithIcon() {
  return (
    <Button
      buttonType={Button.ButtonType.primary}
      label="Create Account"
      icon={
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6 check-circle"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      }
    />
  )
}

export function DangerButton() {
  return (
    <Button buttonType={Button.ButtonType.danger} label="Delete Repository" />
  )
}

export function DangerButtonWithIcon() {
  return (
    <Button
      buttonType={Button.ButtonType.danger}
      label="Delete User"
      icon={
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 trash">
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      }
    />
  )
}

export function LinkButtonWithIcon() {
  return (
    <Button
      buttonType={Button.ButtonType.link}
      label="Edit Post"
      icon={
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 pencil">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      }
    />
  )
}
