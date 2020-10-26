import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
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
  return (
    <>
      <Button
        label="Open"
        buttonType={Button.ButtonType.primary}
        onClick={showDrawer}
      />
      <Drawer visible={visible} />
    </>
  )
}
