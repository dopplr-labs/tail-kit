import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import Radio from 'components/radio'
import { PlusOutline } from 'components/icons'
import Input from 'components/input'
import Select from 'components/select'
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
  const [placement, setPlacement] = useState<
    'top' | 'right' | 'bottom' | 'left'
  >('right')
  const options = ['top', 'right', 'bottom', 'left']

  function showDrawer() {
    setVisible(true)
  }

  function onClose() {
    setVisible(false)
  }

  function handlePlacement(checkedValue: string) {
    if (
      checkedValue === 'top' ||
      checkedValue === 'right' ||
      checkedValue === 'bottom' ||
      checkedValue === 'left'
    ) {
      setPlacement(checkedValue)
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

  function showDrawer() {
    setVisible(true)
  }

  function onClose() {
    setVisible(false)
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
        style={{ width: '550px' }}
        footer={
          <div className="flex items-center justify-end gap-x-3">
            <Button label="Cancel" onClick={onClose} />
            <Button
              label="Submit"
              buttonType={Button.ButtonType.primary}
              onClick={onClose}
            />
          </div>
        }
      >
        <div className="flex items-center justify-center mb-8 gap-x-3">
          <div className="w-1/2 space-y-2">
            <label>First Name</label>
            <Input placeholder="Enter first name" />
          </div>
          <div className="w-1/2 space-y-2">
            <label>Last Name</label>
            <Input placeholder="Enter last name" />
          </div>
        </div>

        <div className="flex items-center justify-center mb-8 gap-x-3">
          <div className="w-1/2 space-y-2">
            <label>Gender</label>
            <Select
              options={['Male', 'Female', 'Other']}
              placeholder="Select your gender"
              className="w-full"
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label>Marital Status</label>
            <Select
              options={['Single', 'Married']}
              placeholder="Select your marital status"
            />
          </div>
        </div>

        <div className="flex items-center justify-center mb-8 gap-x-3">
          <div className="w-1/2 space-y-2">
            <label>Phone Number</label>
            <Input placeholder="Enter phone number" />
          </div>
          <div className="w-1/2 space-y-2">
            <label>Email Address</label>
            <Input placeholder="Enter email address" />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label>Past Experience</label>
          <textarea
            className="h-24 px-3 py-2 border rounded-md focus:outline-none focus:shadow-outline"
            placeholder="Please write employee's previous experience description"
          />
        </div>
      </Drawer>
    </>
  )
}
