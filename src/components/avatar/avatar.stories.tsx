import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { AnnotationSolid, UserOutline } from 'components/icons'
import { Avatar } from './avatar'
import { AvatarGroup } from './avatar-group'

export default {
  title: 'Data Display / Avatar',
  component: Avatar,
  subcomponents: { AvatarGroup },
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

export function AvatarTypes() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar icon={<UserOutline />} />
      <Avatar>U</Avatar>
      <Avatar size="large" className="text-sm">
        USER
      </Avatar>
      <Avatar src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
      <Avatar className="font-semibold text-red-400 bg-red-100">U</Avatar>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutline />} />
    </div>
  )
}

export function AvatarGroupDemo() {
  return (
    <>
      <Avatar.Group>
        <Avatar src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutline />} />
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          icon={<AnnotationSolid />}
        />
      </Avatar.Group>
      <div className="my-4 border-t" />
      <Avatar.Group
        maxCount={2}
        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      >
        <Avatar src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutline />} />
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          icon={<AnnotationSolid />}
        />
      </Avatar.Group>
    </>
  )
}
