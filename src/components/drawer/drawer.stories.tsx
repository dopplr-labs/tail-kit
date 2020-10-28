import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import Radio from 'components/radio'
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
      >
        <p>Some Contents...</p>
        <p>Some Contents...</p>
        <p>Some Contents...</p>
      </Drawer>
    </>
  )
}
