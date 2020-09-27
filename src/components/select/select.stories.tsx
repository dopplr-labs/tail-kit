import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import {
  BeakerOutline,
  CalculatorOutline,
  ChipOutline,
  ClipboardListOutline,
} from 'components/icons'
import { optionType, Select } from './select'

export default {
  title: 'Data Entry/Select',
  component: Select,
} as Meta

export function DefaultSelect() {
  const options = [
    'Black Widow',
    'Hulk',
    'Spiderman',
    'Captain America',
    'Doctor Strange',
    'Hawk Eye',
  ]
  function handleChange(selectedItem: string | optionType | null) {
    action('selected option')(selectedItem)
  }
  return (
    <Select
      placeholder="Select Avenger"
      options={options}
      onChange={handleChange}
      className="w-48"
    />
  )
}

export function DisabledSelect() {
  const options = [
    'Black Widow',
    'Hulk',
    'Spiderman',
    'Captain America',
    'Doctor Strange',
    'Hawk Eye',
  ]
  return (
    <Select
      placeholder="Select Avenger"
      options={options}
      disabled
      className="w-48"
    />
  )
}

export function SelectWithListIcons() {
  const options = [
    { label: 'Beaker', value: 'beaker', icon: <BeakerOutline /> },
    { label: 'Calculator', value: 'calculator', icon: <CalculatorOutline /> },
    { label: 'Chip', value: 'chip', icon: <ChipOutline /> },
    {
      label: 'Clipboard List',
      value: 'clipboard-list',
      icon: <ClipboardListOutline />,
    },
  ]
  return <Select options={options} placeholder="Select SVG" className="w-56" />
}
