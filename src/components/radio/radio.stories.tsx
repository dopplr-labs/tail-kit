import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Switch from 'components/switch'
import { Radio } from './radio'

export default {
  title: 'Data Entry/Radio',
  component: Radio,
} as Meta

export function DefaultRadio() {
  return <Radio label="Radio" />
}

export function DisabledRadio() {
  const [disable, setDisable] = useState(true)
  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Radio label="Disabled" disabled={disable} />
        <Radio label="Disabled" disabled={disable} checked />
      </div>
      <div className="flex items-center space-x-4">
        <Switch
          onChange={() => {
            setDisable((prevState) => !prevState)
          }}
        />
        <span className="text-sm text-gray-800">Toggle Disabled Radio</span>
      </div>
    </div>
  )
}
