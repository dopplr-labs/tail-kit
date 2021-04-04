import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { UserOutline } from 'components/icons'
import { Avatar } from './avatar'

export default {
  title: 'Data Display / Avatar',
  component: Avatar,
} as Meta

export function Basic() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar size="large" icon={<UserOutline />} />
        <Avatar icon={<UserOutline />} />
        <Avatar size="small" icon={<UserOutline />} />
      </div>
      <div className="flex items-center space-x-4">
        <Avatar shape="square" size="large" icon={<UserOutline />} />
        <Avatar shape="square" icon={<UserOutline />} />
        <Avatar shape="square" size="small" icon={<UserOutline />} />
      </div>
    </div>
  )
}
