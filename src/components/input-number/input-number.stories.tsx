import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { InputNumber } from './input-number'

export default {
  title: 'Data Entry/Input Number',
  component: InputNumber,
} as Meta

export function DefaultInputNumber() {
  return <InputNumber className="w-64" defaultValue={3} min={1} max={10} />
}
