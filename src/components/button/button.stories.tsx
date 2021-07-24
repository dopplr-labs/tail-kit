import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import {
  HiShieldCheck,
  HiOutlinePlus,
  HiCheckCircle,
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiOutlineChevronRight,
} from 'react-icons/hi'
import ThemeDecorator from 'helpers/theme-decorator'
import { Button } from './button'

export default {
  title: 'General/Button',
  component: Button,
  decorators: [
    (Story) => (
      <ThemeDecorator
        darkTheme={{
          '--primary-color': colors.cyan['600'],
          '--error-color': colors.red['500'],
          '--disabled-color': colors.gray['600'],
        }}
        themeConfig={{
          '--primary-color': {
            type: 'color',
            initialValue: colors.green['600'],
          },
          '--error-color': {
            type: 'color',
            initialValue: colors.rose['500'],
          },
          '--disabled-color': {
            type: 'color',
            initialValue: colors.blueGray['400'],
          },
          '--border-radius-default': {
            type: 'number',
            initialValue: 0.25,
          },
          '--font-family': {
            type: 'string',
            initialValue: defaultTheme.fontFamily?.sans.join(',') ?? '',
          },
        }}
      >
        <Story />
      </ThemeDecorator>
    ),
  ],
} as Meta

export function DefaultButton() {
  return <Button label="Login" />
}

export function DefaultButtonWithIcon() {
  return <Button label="Update Password" icon={<HiShieldCheck />} />
}

export function DefaultDisabledButtonWithIcon() {
  return <Button label="Update Password" icon={<HiShieldCheck />} disabled />
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

export function PrimaryDisabledButtonWithIcon() {
  return (
    <Button
      buttonType={Button.ButtonType.primary}
      label="Create Account"
      icon={<HiCheckCircle />}
      disabled
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

export function LinkDisabledButtonWithIcon() {
  return (
    <Button
      buttonType={Button.ButtonType.link}
      label="Edit Post"
      icon={<HiOutlinePencilAlt />}
      disabled
    />
  )
}

export function LinkLoadingButton() {
  return (
    <Button buttonType={Button.ButtonType.link} label="Updating Post" loading />
  )
}

export function LinkDisabledLoadingButton() {
  return (
    <Button
      buttonType={Button.ButtonType.link}
      label="Updating Post"
      loading
      disabled
    />
  )
}
