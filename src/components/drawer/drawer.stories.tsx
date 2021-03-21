import React, { useRef, useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import Button from 'components/button'
import Radio from 'components/radio'
import Form from 'components/form'
import { PlusOutline } from 'components/icons'
import Input from 'components/input'
import Select from 'components/select'
import { Drawer, DrawerPlacement } from './drawer'

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
      <Button
        label="Open"
        buttonType={Button.ButtonType.primary}
        onClick={showDrawer}
      />
      <Drawer visible={visible} title="Basic Drawer" onRequestClose={onClose}>
        <p>Some Contents...</p>
        <p>Some Contents...</p>
        <p>Some Contents...</p>
      </Drawer>
    </>
  )
}

export function CustomPlacement() {
  const [visible, setVisible] = useState(false)
  const [placement, setPlacement] = useState(DrawerPlacement.right)
  const options = ['top', 'right', 'bottom', 'left']

  function showDrawer() {
    setVisible(true)
  }

  function onClose() {
    setVisible(false)
  }

  function handlePlacement(checkedValue: string) {
    if (checkedValue === 'right') {
      setPlacement(DrawerPlacement.right)
    } else if (checkedValue === 'left') {
      setPlacement(DrawerPlacement.left)
    } else if (checkedValue === 'top') {
      setPlacement(DrawerPlacement.top)
    } else if (checkedValue === 'bottom') {
      setPlacement(DrawerPlacement.bottom)
    }
  }

  return (
    <>
      <div className="flex items-center space-x-6">
        <Radio.RadioGroup
          options={options}
          defaultValue="right"
          onChange={handlePlacement}
        />
        <Button
          label="Open"
          buttonType={Button.ButtonType.primary}
          onClick={showDrawer}
        />
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
      <Button
        label="New Employee"
        icon={<PlusOutline />}
        onClick={showDrawer}
      />
      <Drawer
        visible={visible}
        title="Create a new employee account"
        onRequestClose={onClose}
        closable
        size={560}
        footer={
          <div className="flex items-center justify-end gap-x-3">
            <Button label="Cancel" onClick={onClose} />
            <Button
              label="Submit"
              buttonType={Button.ButtonType.primary}
              onClick={onDrawerSubmit}
            />
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
              className="w-full h-24 px-3 py-2 text-sm border rounded-md focus:outline-none focus:shadow-outline"
              placeholder="Please write employee's previous experience description"
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
