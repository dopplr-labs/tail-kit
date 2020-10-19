import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { NPSInput } from './nps'

export default {
  title: 'Survey/NPS',
  component: NPSInput,
} as Meta

export function DefaultNps() {
  return <NPSInput />
}
