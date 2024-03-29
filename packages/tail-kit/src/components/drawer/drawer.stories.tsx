import React, { useRef, useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { HiOutlinePlus } from 'react-icons/hi'
import Button from '../button'
import Radio from '../radio'
import Form from '../form'
import Input from '../input'
import Select from '../select'
import { Drawer } from './drawer'

export default {
  title: 'Feedback/Drawer',
  component: Drawer,
} as Meta

export function BasicDrawer() {
  const [visible, setVisible] = useState(false)

  function showDrawer() {
    setVisible(true)
  }

  function onClose() {
    setVisible(false)
  }
  return (
    <>
      <Button buttonType="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer visible={visible} title="Basic Drawer" onRequestClose={onClose}>
        <p>Some Contents...</p>
        <p>Some Contents...</p>
        <p>Some Contents...</p>
      </Drawer>
    </>
  )
}

export function CustomPlacement() {
  type PlacementTypes = 'top' | 'right' | 'bottom' | 'left'
  const [visible, setVisible] = useState(false)
  const [placement, setPlacement] = useState<PlacementTypes>('right')
  const options = ['top', 'right', 'bottom', 'left']

  function showDrawer() {
    setVisible(true)
  }

  function onClose() {
    setVisible(false)
  }

  function handlePlacement(checkedValue: string) {
    setPlacement(checkedValue as PlacementTypes)
  }

  return (
    <>
      <div className="flex items-center space-x-6">
        <Radio.RadioGroup
          options={options}
          defaultValue="right"
          onChange={handlePlacement}
        />
        <Button buttonType="primary" onClick={showDrawer}>
          Open
        </Button>
      </div>
      <Drawer
        visible={visible}
        title="Basic Drawer"
        onRequestClose={onClose}
        placement={placement}
        closable
      >
        <p>Some Contents...</p>
        <p>Some Contents...</p>
        <p>Some Contents...</p>
      </Drawer>
    </>
  )
}

export function SubmitFormInDrawer() {
  const [visible, setVisible] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  function showDrawer() {
    setVisible(true)
  }

  function onClose() {
    setVisible(false)
  }

  function onFormSubmit(data: any) {
    action('form-data')(data)
  }

  function onDrawerSubmit() {
    formRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true }),
    )
    onClose()
  }
  return (
    <>
      <Button icon={<HiOutlinePlus />} onClick={showDrawer}>
        New Employee
      </Button>
      <Drawer
        visible={visible}
        title="Create a new employee account"
        onRequestClose={onClose}
        closable
        size={560}
        footer={
          <div className="flex items-center justify-end gap-x-3">
            <Button onClick={onClose}>Cancel</Button>
            <Button buttonType="primary" onClick={onDrawerSubmit}>
              Submit
            </Button>
          </div>
        }
      >
        <Form
          layout={Form.Layout.VERTICAL}
          className="p-0"
          ref={formRef}
          onSubmit={onFormSubmit}
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
              className="w-full h-24 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2"
              placeholder="Please write employee's previous experience description"
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
