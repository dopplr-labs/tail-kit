import React from 'react'
import { FiFigma } from 'react-icons/fi'
import { FaRegComment } from 'react-icons/fa'
import { AiOutlineEdit, AiOutlineFontSize } from 'react-icons/ai'
import { IoMdHand } from 'react-icons/io'
import { Meta } from '@storybook/react/types-6-0'
import { AnnotationSolid, UserOutline } from 'components/icons'
import Button from 'components/button'
import Tooltip from 'components/tooltip'
import Avatar from '.'
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
        <Tooltip title="Brad Gibson" placement="bottom">
          <Avatar src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
        </Tooltip>
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Tooltip title="Unknown User" placement="bottom">
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutline />}
          />
        </Tooltip>
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
      <div className="my-4 border-t" />
      <Avatar.Group
        maxCount={2}
        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        size="large"
        maxPopoverPlacement="bottom"
      >
        <Avatar src="https://randomuser.me/api/portraits/thumb/men/75.jpg" />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Tooltip title="Brad Gibson" placement="bottom">
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutline />}
          />
        </Tooltip>
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          icon={<AnnotationSolid />}
        />
      </Avatar.Group>
    </>
  )
}

export function AvatarsInNavbar() {
  const userList = [
    {
      name: 'Brad Gibson',
      src: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
    { name: 'Kumar Sanu', style: { backgroundColor: '#87d068' } },
    {
      name: 'Marcus Brownlee',
      style: { backgroundColor: '#87d068' },
      icon: <UserOutline />,
    },
    {
      name: 'Johnny Harris',
      style: { backgroundColor: '#1890ff' },
      icon: <AnnotationSolid />,
    },
  ]
  return (
    <div className="flex items-center justify-between w-full px-3 py-2 bg-gray-800 rounded">
      <div className="flex items-center space-x-4">
        <FiFigma className="w-6 h-6 text-white" />
        <div className="h-6 border-r border-white" />
        <AiOutlineEdit className="w-4 h-4 text-white" />
        <AiOutlineFontSize className="w-4 h-4 text-white" />
        <IoMdHand className="w-4 h-4 text-white" />
        <FaRegComment className="w-4 h-4 text-white" />
      </div>
      <div className="flex items-center space-x-4">
        <Avatar.Group
          maxCount={2}
          maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          maxPopoverPlacement="bottom"
        >
          {userList.map((user, index) => (
            <Tooltip title={user.name} placement="bottom" key={index}>
              <Avatar src={user.src} style={user.style}>
                {user.name
                  .split(' ')
                  .map((name) => name[0])
                  .join('')}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
        <Button label="Share" buttonType={Button.ButtonType.primary} />
      </div>
    </div>
  )
}
