import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { Meta } from '@storybook/react/types-6-0'
import Switch from 'components/switch'
import { Radio } from './radio'
import { RadioGroup } from './radio-group'

export default {
  title: 'Data Entry/Radio',
  component: Radio,
  subcomponents: { RadioGroup },
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

export function RadioWithError() {
  return (
    <div>
      <Radio label="Option A" error />
    </div>
  )
}

export function WithRadioGroup() {
  const plainOptions = ['Option A', 'Option B', 'Option C', 'Option D']
  const options = [
    { label: 'Alpha', value: '1' },
    { label: 'Beta', value: '2' },
    { label: 'Gama', value: '3' },
    { label: 'Omega', value: '4' },
  ]
  const onChange = (RadioGroup: string) => (checkedValue: string) => {
    action(`${RadioGroup}-onChange`)(checkedValue)
  }
  return (
    <div className="space-y-5">
      <RadioGroup
        options={plainOptions}
        defaultValue="Option A"
        onChange={onChange('firstGroup')}
      />
      <RadioGroup
        options={options}
        defaultValue="3"
        onChange={onChange('secondGroup')}
      />
    </div>
  )
}
