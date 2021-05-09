import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import {
  HiShieldCheck,
  HiOutlinePlus,
  HiCheckCircle,
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiOutlineChevronRight,
} from 'react-icons/hi'
import { Button } from './button'

export default {
  title: 'General/Button',
  component: Button,
} as Meta

export function DefaultButton() {
  return <Button label="Login" />
}

export function DefaultButtonWithIcon() {
  return <Button label="Update Password" icon={<HiShieldCheck />} />
}

export function DefaultIconButton() {
  return <Button icon={<HiOutlinePlus />} />
}

export function DefaultIconLoadingButton() {
  return <Button icon={<HiOutlinePlus />} loading />
}

export function DefaultLoadingButton() {
  return <Button label="Submitting" loading />
}

export function DefaultButtonWithIconAfterLabel() {
  return (
    <Button
      label="Next Step"
      icon={<HiOutlineChevronRight />}
      iconPlacement={Button.IconPlacement.afterLabel}
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
      icon={<HiCheckCircle />}
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
      icon={<HiOutlineTrash />}
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
      icon={<HiOutlinePencilAlt />}
    />
  )
}

export function LinkLoadingButton() {
  return (
    <Button buttonType={Button.ButtonType.link} label="Updating Post" loading />
  )
}
