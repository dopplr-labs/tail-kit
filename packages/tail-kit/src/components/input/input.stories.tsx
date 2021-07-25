import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { HiOutlineAtSymbol, HiOutlineKey } from 'react-icons/hi'
import Button from 'components/button'
import { Input } from './input'

export default {
  title: 'Data Entry/Input',
  component: Input,
} as Meta

export function DefaultInput() {
  return <Input className="w-80" placeholder="How are you feeling today?" />
}

export function InputWithIcon() {
  return (
    <div className="space-y-4 w-80">
      <Input placeholder="Email" icon={<HiOutlineAtSymbol />} />
      <Input placeholder="Password" icon={<HiOutlineKey />} type="password" />
      <Button
        label="Login"
        className="w-full"
        buttonType={Button.ButtonType.primary}
      />
    </div>
  )
}

export function InputWithDefaultValue() {
  return <Input defaultValue="My name is " className="w-80" />
}
