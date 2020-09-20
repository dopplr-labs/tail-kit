import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
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
