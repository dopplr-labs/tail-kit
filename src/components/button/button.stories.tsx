import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import {
  ShieldCheckSolid,
  PlusOutline,
  CheckCircleSolid,
  TrashOutline,
  PencilAltOutline,
} from 'components/icons'
import { Button } from './button'

export default {
  title: 'components/button',
  component: Button,
} as Meta

export function DefaultButton() {
  return <Button label="Login" />
}

export function DefaultButtonWithIcon() {
  return <Button label="Update Password" icon={<ShieldCheckSolid />} />
}

export function DefaultIconButton() {
  return <Button icon={<PlusOutline />} />
}

export function DefaultIconLoadingButton() {
  return <Button icon={<PlusOutline />} loading />
}

export function DefaultLoadingButton() {
  return <Button label="Submitting" loading />
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
      icon={<CheckCircleSolid />}
    />
  )
}

export function PrimaryLoadingButton() {
  return (
    <Button
      label="Creating Blog"
      loading
      buttonType={Button.ButtonType.primary}
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
      icon={<TrashOutline />}
    />
  )
}

export function DangerLoadingButton() {
  return (
    <Button
      buttonType={Button.ButtonType.danger}
      label="Deleting Repository"
      loading
    />
  )
}

export function LinkButtonWithIcon() {
  return (
    <Button
      buttonType={Button.ButtonType.link}
      label="Edit Post"
      icon={<PencilAltOutline />}
    />
  )
}

export function LinkLoadingButton() {
  return (
    <Button buttonType={Button.ButtonType.link} label="Updating Post" loading />
  )
}
