import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { NPSInput } from './nps'

export default {
  title: 'Survey/NPS',
  component: NPSInput,
} as Meta

export function DefaultNps() {
  function handleSubmit(score: number) {
    action('Submitted score: ')(score)
  }
  return <NPSInput onSubmit={handleSubmit} />
}
