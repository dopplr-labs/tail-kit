import React, { useRef, useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import {
  HiOutlineAtSymbol,
  HiOutlineFingerPrint,
  HiOutlineKey,
  HiOutlineUser,
} from 'react-icons/hi'
import Radio from '../radio'
import Modal from '../modal'
import Button from '../button'
import Input from '../input'
import Select from '../select'
import Checkbox from '../checkbox'
import Switch from '../switch'
import Form from './index'
import { LayoutOptions } from './form'
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
    <Form
      {...formLayout}
      onSubmit={onSubmit}
      defaultValues={{ rememberMe: true }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email address' }]}
      >
        <Input placeholder="Enter your email" icon={<HiOutlineAtSymbol />} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please enter your password' },
          {
            minLength: 8,
            message: 'Password should be of atleast 8 characters',
          },
        ]}
      >
        <Input placeholder="Password" icon={<HiOutlineKey />} type="password" />
      </Form.Item>
      <Form.Item name="rememberMe" {...tailLayout} valuePropName="checked">
        <Checkbox label="Remember Me" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button className="w-full" type="submit" buttonType="primary">
          Submit
        </Button>
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
        <Radio.RadioGroup
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
        <Button className="w-full" type="submit" buttonType="primary">
          Submit
        </Button>
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
          <Form.Item name="firstName" label="First Name" className="w-full">
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item name="lastName" label="Last Name" className="w-full">
            <Input placeholder="Enter last name" />
          </Form.Item>
        </div>
        <div className="flex w-full space-x-4">
          <Form.Item name="gender" label="Gender" className="w-full">
            <Select
              options={['Male', 'Female', 'Other']}
              placeholder="Select your gender"
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            name="maritalStatus"
            label="Marital Status"
            className="w-full"
          >
            <Select
              options={['Single', 'Married']}
              placeholder="Select your marital status"
              className="w-full"
            />
          </Form.Item>
        </div>
        <div className="flex w-full space-x-4">
          <Form.Item name="phoneNumber" label="Phone Number" className="w-full">
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item name="email" label="Email Address" className="w-full">
            <Input placeholder="Enter email address" />
          </Form.Item>
        </div>
        <Form.Item name="pastExperience" label="Past Experience">
          <textarea
            className="w-full h-24 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2"
            placeholder="Please write employee's previous experience description"
          />
        </Form.Item>
        <div className="flex justify-end space-x-4">
          <Button>Cancel</Button>
          <Button type="submit" buttonType="primary">
            Submit
          </Button>
        </div>
      </Form>
    </>
  )
}

export function Notifications() {
  function onSubmit(data: any) {
    action('form-data')(data)
  }

  const radioOptions = [
    { label: 'Everything', value: 'everything' },
    { label: 'Same as email', value: 'sameAsEmail' },
    { label: 'No push notifications', value: 'none' },
  ]
  return (
    <Form
      layout={Form.Layout.VERTICAL}
      onSubmit={onSubmit}
      className="max-w-xl pt-8 mx-auto rounded-md shadow-lg"
    >
      <div className="px-8 space-y-4">
        <div className="text-sm font-semibold text-gray-600">By Email</div>
        <Form.Item
          name="comments"
          valuePropName="checked"
          extra={
            <div className="ml-6 text-sm text-gray-500">
              Get notified when someones posts a comment on a posting.
            </div>
          }
        >
          <Checkbox label="Comments" />
        </Form.Item>
        <Form.Item
          name="candidates"
          valuePropName="checked"
          extra={
            <div className="ml-6 text-sm text-gray-500">
              Get notified when a candidate applies for a job.
            </div>
          }
        >
          <Checkbox label="Candidates" />
        </Form.Item>
        <Form.Item
          name="offers"
          valuePropName="checked"
          extra={
            <div className="ml-6 text-sm text-gray-500">
              Get notified when a candidate accepts or rejects an offer.
            </div>
          }
        >
          <Checkbox label="Offers" />
        </Form.Item>
      </div>

      <div className="px-8">
        <div className="text-sm font-semibold text-gray-600">
          Push Notifications
        </div>
        <div className="mb-2 text-sm text-gray-400">
          These are delivered via SMS to your mobile phone.
        </div>
        <Form.Item name="bySMS">
          <Radio.RadioGroup options={radioOptions} />
        </Form.Item>
      </div>
      <div className="flex justify-end px-4 py-2 bg-gray-50">
        <Button type="submit" buttonType="primary">
          Save
        </Button>
      </div>
    </Form>
  )
}

export function InlineLoginForm() {
  function onSubmit(data: any) {
    action('form-data')(data)
  }
  return (
    <Form layout={Form.Layout.INLINE} onSubmit={onSubmit}>
      {({ isDirty, isValid }: { isDirty: boolean; isValid: boolean }) => (
        <>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input placeholder="Username" icon={<HiOutlineUser />} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input
              placeholder="Password"
              type="password"
              icon={<HiOutlineFingerPrint />}
            />
          </Form.Item>
          <Button
            type="submit"
            buttonType="primary"
            disabled={!isDirty || !isValid}
          >
            Submit
          </Button>
        </>
      )}
    </Form>
  )
}

export function AsyncForm() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
  async function onSubmit(data: any) {
    await sleep(3000)
    action('form-data')(data)
  }
  return (
    <Form
      layout={Form.Layout.VERTICAL}
      className="max-w-xl mx-auto"
      onSubmit={onSubmit}
    >
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <>
          <div className="flex w-full space-x-4">
            <Form.Item name="firstName" label="First Name" className="w-full">
              <Input placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" className="w-full">
              <Input placeholder="Enter your last name" />
            </Form.Item>
          </div>
          <Form.Item name="company" label="Company">
            <Input placeholder="Enter your company name" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Enter your email address" />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input placeholder="+91-9148739422" />
          </Form.Item>
          <Form.Item name="message" label="Message">
            <textarea
              className="w-full h-24 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2"
              placeholder="Please write employee's previous experience description"
            />
          </Form.Item>
          <div className="flex items-center space-x-4">
            <Form.Item name="privacyPolicy" valuePropName="checked">
              <Switch />
            </Form.Item>
            <div className="w-full text-sm text-gray-500">
              By Selecting this, you agree to the{' '}
              <b>
                <u>Privacy Policy</u>
              </b>{' '}
              and{' '}
              <b>
                <u>Cookie Policy</u>
              </b>
            </div>
          </div>
          <Button
            type="submit"
            buttonType="primary"
            className="w-full"
            loading={isSubmitting}
          >
            Let&apos; s Talk
          </Button>
        </>
      )}
    </Form>
  )
}

export function FormInModal() {
  const [show, setShow] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  function openModal() {
    setShow(true)
  }
  function closeModal() {
    setShow(false)
  }
  function onOk() {
    formRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    )
    closeModal()
  }
  function onSubmit(data: any) {
    action('form-data')(data)
  }
  return (
    <>
      <Button buttonType="primary" onClick={openModal}>
        Create Project
      </Button>
      <Modal
        title="Create a new project"
        visible={show}
        okButtonProps={{ children: 'Create' }}
        onRequestClose={closeModal}
        onOK={onOk}
      >
        <Form
          layout={Form.Layout.VERTICAL}
          className="p-4"
          onSubmit={onSubmit}
          ref={formRef}
          defaultValues={{ type: 'Public' }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Please add title for your project!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item name="type">
            <Radio.RadioGroup options={['Public', 'Private']} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
