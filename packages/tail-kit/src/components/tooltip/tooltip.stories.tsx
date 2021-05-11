import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiOutlinePlus,
  HiShoppingCart,
  HiOutlineTrash,
  HiOutlineDownload,
} from 'react-icons/hi'
import React from 'react'
import { Tooltip } from './tooltip'

export default {
  title: 'Data Display/Toolitp',
  component: Tooltip,
} as Meta

export function DefaultTooltip() {
  return (
    <Tooltip title="Create a new blog">
      <Button icon={<HiOutlinePlus />} />
    </Tooltip>
  )
}

export function TooltipWithIcon() {
  return (
    <Tooltip
      title="User once deleted cannot be restored"
      icon={<HiExclamationCircle className="w-5 h-5 text-red-500" />}
    >
      <Button
        buttonType={Button.ButtonType.danger}
        icon={<HiOutlineTrash />}
        label="Delete User"
      />
    </Tooltip>
  )
}

export function TooltipWithExplicitPlacement() {
  return (
    <div className="flex items-center mx-auto my-20 space-x-2 w-min-content">
      <Tooltip title="Left" placement="left">
        <Button label="Left" className="w-20" />
      </Tooltip>
      <div className="space-y-16">
        <div className="flex space-x-4">
          <Tooltip title="Top Left" placement="topLeft">
            <Button label="Top Left" className="w-32" />
          </Tooltip>
          <Tooltip title="Top" placement="top">
            <Button label="Top" className="w-32" />
          </Tooltip>
          <Tooltip title="Top Right" placement="topRight">
            <Button label="Top Right" className="w-32" />
          </Tooltip>
        </div>
        <div className="flex space-x-4">
          <Tooltip title="Bottom Left" placement="bottomLeft">
            <Button label="Bottom Left" className="w-32" />
          </Tooltip>
          <Tooltip title="Bottom" placement="bottom">
            <Button label="Bottom" className="w-32" />
          </Tooltip>
          <Tooltip title="Bottom Right" placement="bottomRight">
            <Button label="Bottom Right" className="w-32" />
          </Tooltip>
        </div>
      </div>
      <Tooltip title="Right" placement="right">
        <Button label="Right" className="w-20" />
      </Tooltip>
    </div>
  )
}

export function TooltipWithLightBackground() {
  return (
    <Tooltip
      title="Place order for items present in cart"
      inverted={false}
      icon={<HiCheckCircle className="w-5 h-5 text-green-500" />}
      placement="top"
    >
      <Button
        icon={<HiShoppingCart />}
        label="Place Order"
        buttonType={Button.ButtonType.primary}
      />
    </Tooltip>
  )
}

export function TooltipWithoutPointingArrow() {
  return (
    <Tooltip
      title="Download the file in your Google Drive"
      pointingArrow={false}
    >
      <Button icon={<HiOutlineDownload />} label="Download" />
    </Tooltip>
  )
}
