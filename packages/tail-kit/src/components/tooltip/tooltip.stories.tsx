import { Meta } from '@storybook/react/types-6-0'
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiOutlinePlus,
  HiShoppingCart,
  HiOutlineTrash,
  HiOutlineDownload,
} from 'react-icons/hi'
import React from 'react'
import Button from '../button'
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
      <Button buttonType="danger" icon={<HiOutlineTrash />}>
        Delete User
      </Button>
    </Tooltip>
  )
}

export function TooltipWithExplicitPlacement() {
  return (
    <div className="flex items-center mx-auto my-20 space-x-2 w-min-content">
      <Tooltip title="Left" placement="left">
        <Button className="w-20">Left</Button>
      </Tooltip>
      <div className="space-y-16">
        <div className="flex space-x-4">
          <Tooltip title="Top Left" placement="topLeft">
            <Button className="w-32">Top Left</Button>
          </Tooltip>
          <Tooltip title="Top" placement="top">
            <Button className="w-32">Top</Button>
          </Tooltip>
          <Tooltip title="Top Right" placement="topRight">
            <Button className="w-32">Top Right</Button>
          </Tooltip>
        </div>
        <div className="flex space-x-4">
          <Tooltip title="Bottom Left" placement="bottomLeft">
            <Button className="w-32">Bottom Left</Button>
          </Tooltip>
          <Tooltip title="Bottom" placement="bottom">
            <Button className="w-32">Bottom</Button>
          </Tooltip>
          <Tooltip title="Bottom Right" placement="bottomRight">
            <Button className="w-32">Bottom Right</Button>
          </Tooltip>
        </div>
      </div>
      <Tooltip title="Right" placement="right">
        <Button className="w-20">Right</Button>
      </Tooltip>
    </div>
  )
}

export function TooltipWithDarkBackground() {
  return (
    <Tooltip
      title="Place order for items present in cart"
      inverted
      icon={<HiCheckCircle className="w-5 h-5 text-green-500" />}
      placement="top"
    >
      <Button icon={<HiShoppingCart />} buttonType="primary">
        Place Order
      </Button>
    </Tooltip>
  )
}

export function TooltipWithoutPointingArrow() {
  return (
    <Tooltip title="Download the file in your Google Drive" hideArrow>
      <Button icon={<HiOutlineDownload />}>Download </Button>
    </Tooltip>
  )
}
