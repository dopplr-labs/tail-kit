import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Switch from '../switch'
import { InputNumber } from './input-number'

export default {
  title: 'Data Entry/Input Number',
  component: InputNumber,
} as Meta

export function DefaultInputNumber() {
  return <InputNumber className="w-32" defaultValue={3} min={1} max={10} />
}

export function DecimalNumberInput() {
  return <InputNumber className="w-32" min={0} max={10} step={0.1} />
}

export function DisabledNumberInput() {
  const [disable, setDisable] = useState(true)
  return (
    <div className="flex items-center space-x-4">
      <InputNumber className="w-32" disabled={disable} defaultValue={3} />
      <Switch
        onChange={() => {
          setDisable((prevState) => !prevState)
        }}
      />
      <div className="text-sm text-gray-800">Toggle Disabled Input</div>
    </div>
  )
}
