import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import Button from 'components/button'
import Input from 'components/input'
import { AtSymbolOutline, KeyOutline } from 'components/icons'
import { Form } from './form'

export default {
  title: 'Data Entry/Form',
  component: Form,
} as Meta

export function Basic() {
  const onSubmit = (data: any) => action('form-data')(data)
  return (
    <Form className="max-w-md mx-auto" onSubmit={onSubmit}>
      <Form.Item label="Email" name="email">
        <Input placeholder="Enter your email" icon={<AtSymbolOutline />} />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input placeholder="Password" icon={<KeyOutline />} type="password" />
      </Form.Item>
      <Button
        label="Submit"
        className="w-full"
        type="submit"
        buttonType={Button.ButtonType.primary}
      />
    </Form>
  )
}
