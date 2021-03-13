import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import Button from 'components/button'
import Input from 'components/input'
import Checkbox from 'components/checkbox'
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
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter you email address' }]}
      >
        <Input placeholder="Enter your email" icon={<AtSymbolOutline />} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please enter you password' },
          {
            minLength: 8,
            message: 'Password should be of atleast 8 characters',
          },
        ]}
      >
        <Input placeholder="Password" icon={<KeyOutline />} type="password" />
      </Form.Item>
      <Form.Item name="remember-me">
        <Checkbox label="Remember Me" />
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
