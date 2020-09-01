import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AtSymbolOutline, KeyOutline } from 'components/icons'
import Button from 'components/button'
import { Input } from './input'

export default {
  title: 'components/input',
  component: Input,
} as Meta

export function DefaultInput() {
  return <Input className="w-80" placeholder="How are you feeling today?" />
}

export function InputWithIcon() {
  return (
    <div className="space-y-4 w-80">
      <Input placeholder="Email" icon={<AtSymbolOutline />} />
      <Input placeholder="Password" icon={<KeyOutline />} type="password" />
      <Button
        label="Login"
        className="w-full"
        buttonType={Button.ButtonType.primary}
      />
    </div>
  )
}
