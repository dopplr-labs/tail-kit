import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import Button from 'components/button'
import Input from 'components/input'
import Select from 'components/select'
import Checkbox from 'components/checkbox'
import { AtSymbolOutline, KeyOutline } from 'components/icons'
import { RadioGroup } from 'components/radio/radio-group'
import { Form, LayoutOptions } from './form'
import { FormItem } from './form-item'

export default {
  title: 'Data Entry/Form',
  component: Form,
  subcomponents: { FormItem },
} as Meta

export function Basic() {
  const tailLayout = { wrapperCol: { span: 2, offset: 2 } }
  const formLayout = { wrapperCol: { span: 2 } }

  function onSubmit(data: any) {
    action('form-data')(data)
  }
  return (
    <Form {...formLayout} onSubmit={onSubmit}>
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
      <Form.Item name="rememberMe" {...tailLayout}>
        <Checkbox label="Remember Me" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          label="Submit"
          className="w-full"
          type="submit"
          buttonType={Button.ButtonType.primary}
        />
      </Form.Item>
    </Form>
  )
}

export function FormLayout() {
  const [formLayout, setFormLayout] = useState(Form.Layout.HORIZONTAL)
  const formItemLayout = { wrapperCol: { span: 2 } }
  const buttonLayout = { wrapperCol: { span: 1, offset: 2 } }

  function onFormLayoutChange(checkedValue: string) {
    setFormLayout(checkedValue as LayoutOptions)
  }
  const radioOptions = [
    { label: 'Horizontal', value: 'horizontal' },
    { label: 'Vertical', value: 'vertical' },
    { label: 'Inline', value: 'inline' },
  ]
  function onSubmit(data: any) {
    action('form-data')(data)
  }
  return (
    <Form {...formItemLayout} layout={formLayout} onSubmit={onSubmit}>
      <Form.Item label="Form Layout" name="layout">
        <RadioGroup
          options={radioOptions}
          defaultValue={LayoutOptions.HORIZONTAL}
          onChange={onFormLayoutChange}
        />
      </Form.Item>
      <Form.Item
        name="fieldA"
        label="Field A"
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item name="fieldB" label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item {...buttonLayout}>
        <Button
          type="submit"
          buttonType={Button.ButtonType.primary}
          label="Submit"
        />
      </Form.Item>
    </Form>
  )
}

export function TwoColumnForm() {
  function onSubmit(data: any) {
    action('form-data')(data)
  }
  return (
    <>
      <div className="px-8 font-semibold text-gray-700">
        Create a new employee account
      </div>
      <Form
        onSubmit={onSubmit}
        layout={Form.Layout.VERTICAL}
        className="px-8 py-4"
      >
        <div className="flex w-full space-x-4">
          <Form.Item name="firstName" label="First Name">
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name">
            <Input placeholder="Enter last name" />
          </Form.Item>
        </div>
        <div className="flex w-full space-x-4">
          <Form.Item name="gender" label="Gender">
            <Select
              options={['Male', 'Female', 'Other']}
              placeholder="Select your gender"
              className="w-full"
            />
          </Form.Item>
          <Form.Item name="maritalStatus" label="Marital Status">
            <Select
              options={['Single', 'Married']}
              placeholder="Select your marital status"
              className="w-full"
            />
          </Form.Item>
        </div>
        <div className="flex w-full space-x-4">
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="email" label="Email Address">
            <Input placeholder="Enter email address" />
          </Form.Item>
        </div>
        <Form.Item name="pastExperience" label="Past Experience">
          <textarea
            className="w-full h-24 px-3 py-2 text-sm border rounded-md focus:outline-none focus:shadow-outline"
            placeholder="Please write employee's previous experience description"
          />
        </Form.Item>
        <div className="flex justify-end space-x-4">
          <Button label="Cancel" />
          <Button
            type="submit"
            buttonType={Button.ButtonType.primary}
            label="Submit"
          />
        </div>
      </Form>
    </>
  )
}
