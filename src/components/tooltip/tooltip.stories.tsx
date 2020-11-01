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
      title="User once deleted cannot be restored"
      icon={<ExclamationOutline className="w-6 h-6 text-red-500" />}
    >
      <Button
        buttonType={Button.ButtonType.danger}
        icon={<TrashOutline />}
        label="Delete User"
      />
    </Tooltip>
  )
}

export function TooltipWithExplicitPlacement() {
  return (
    <div className="flex items-center mx-auto my-20 space-x-2 w-min-content">
      <Tooltip title="Left" defaultPlacement="left">
        <Button label="Left" className="w-20" />
      </Tooltip>
      <div className="space-y-12">
        <div className="flex space-x-4">
          <Tooltip title="Top Left" defaultPlacement="topLeft">
            <Button label="Top Left" className="w-32" />
          </Tooltip>
          <Tooltip title="Top" defaultPlacement="top">
            <Button label="Top" className="w-32" />
          </Tooltip>
          <Tooltip title="Top Right" defaultPlacement="topRight">
            <Button label="Top Right" className="w-32" />
          </Tooltip>
        </div>
        <div className="flex space-x-4">
          <Tooltip title="Bottom Left" defaultPlacement="bottomLeft">
            <Button label="Bottom Left" className="w-32" />
          </Tooltip>
          <Tooltip title="Bottom" defaultPlacement="bottom">
            <Button label="Bottom" className="w-32" />
          </Tooltip>
          <Tooltip title="Bottom Right" defaultPlacement="bottomRight">
            <Button label="Bottom Right" className="w-32" />
          </Tooltip>
        </div>
      </div>
      <Tooltip title="Right" defaultPlacement="right">
        <Button label="Right" className="w-20" />
      </Tooltip>
    </div>
  )
}
