import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Switch } from './switch'

export default {
  title: 'components/switch',
  component: Switch,
} as Meta

export function DefaultSwitch() {
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
