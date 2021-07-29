import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import { Switch } from './switch'

export default {
  title: 'Data Entry / Switch',
  component: Switch,
} as Meta

export function DefaultSwitch() {
  return <Switch />
}

export function ControlledSwitch() {
  const [checked, setChecked] = useState(false)
  return (
    <Switch
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked)
      }}
    />
  )
}

export function DisbaledSwitch() {
  const [disable, setDisable] = useState(true)

  return (
    <div className="flex items-center space-x-3">
      <Switch disabled={disable} />
      <Button onClick={() => setDisable(!disable)}>Toggle Disabled</Button>
    </div>
  )
}
