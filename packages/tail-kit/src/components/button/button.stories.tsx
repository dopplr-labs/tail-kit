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
  return <Button>Login</Button>
}

export function DefaultButtonWithIcon() {
  return <Button icon={<HiShieldCheck />}>Update Password</Button>
}

export function DefaultIconButton() {
  return <Button icon={<HiOutlinePlus />} />
}

export function DefaultIconLoadingButton() {
  return <Button icon={<HiOutlinePlus />} loading />
}

export function DefaultLoadingButton() {
  return <Button loading>Submitting</Button>
}

export function DefaultButtonWithIconafterText() {
  return (
    <Button icon={<HiOutlineChevronRight />} iconPlacement="afterText">
      Next Step
    </Button>
  )
}

export function PrimaryButton() {
  return <Button buttonType="primary">Create Account</Button>
}

export function PrimaryButtonWithIcon() {
  return (
    <Button buttonType="primary" icon={<HiCheckCircle />}>
      Create Account
    </Button>
  )
}

export function PrimaryLoadingButton() {
  return (
    <Button loading buttonType="primary">
      Creating Blog
    </Button>
  )
}

export function DangerButton() {
  return <Button buttonType="danger">Delete Repository</Button>
}

export function DangerButtonWithIcon() {
  return (
    <Button buttonType="danger" icon={<HiOutlineTrash />}>
      Delete User
    </Button>
  )
}

export function DangerLoadingButton() {
  return (
    <Button buttonType="danger" loading>
      Deleting Repository
    </Button>
  )
}

export function LinkButtonWithIcon() {
  return (
    <Button buttonType="link" icon={<HiOutlinePencilAlt />}>
      Edit Post
    </Button>
  )
}

export function LinkLoadingButton() {
  return (
    <Button buttonType="link" loading>
      Updating Post
    </Button>
  )
}
