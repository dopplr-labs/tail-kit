import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import { ExclamationOutline, PlusOutline, TrashOutline } from 'components/icons'
import React from 'react'
import { Tooltip } from './tooltip'

export default {
  title: 'Data Display/Toolitp',
  component: Tooltip,
} as Meta

export function DefaultTooltip() {
  return (
    <Tooltip title="Create a new blog">
      <Button icon={<PlusOutline />} />
    </Tooltip>
  )
}

export function TooltipWithIcon() {
  return (
    <Tooltip
      title={
        <span className="text-red-500">
          User once deleted cannot be restored
        </span>
      }
      icon={<ExclamationOutline className="w-5 h-5 text-red-500" />}
    >
      <Button
        buttonType={Button.ButtonType.danger}
        icon={<TrashOutline />}
        label="Delete User"
      />
    </Tooltip>
  )
}
