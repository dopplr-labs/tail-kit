import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import { Popover } from './popover'

export default {
  component: Popover,
  title: 'Data Display / Popover',
} as Meta

export function DefaultPopover() {
  const user = {
    name: {
      first: 'Brad',
      last: 'Gibson',
    },
    username: '@bradgibson',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/75.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/75.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    },
    bio:
      'Developing UI-kit by day and using them in personal projects by night',
    follower: 200,
    following: 100,
  }

  const [following, setFollowing] = useState(false)

  return (
    <Popover
      content={
        <div className="w-64">
          <div className="flex items-start justify-between mb-4">
            <img
              src={user.picture.large}
              className="object-cover w-16 h-16 rounded-full"
            />
            <Button
              label={following ? 'Following' : 'Follow'}
              buttonType={
                following
                  ? Button.ButtonType.primary
                  : Button.ButtonType.default
              }
              onClick={() => {
                setFollowing((prevState) => !prevState)
              }}
            />
          </div>
          <div className="text-base font-medium text-gray-800">
            {user.name.first} {user.name.last}
          </div>
          <div className="mb-2 text-sm text-gray-400">{user.username}</div>
          <div className="mb-4 text-sm text-gray-600">{user.bio}</div>
          <div className="text-sm text-gray-500">
            <span className="mr-1 font-semibold text-gray-800 tabular-nums">
              {user.follower + (following ? 1 : 0)}
            </span>
            <span className="mr-6">Followers</span>
            <span className="mr-1 font-semibold text-gray-800 tabular-nums">
              {user.following}
            </span>
            <span>Following</span>
          </div>
        </div>
      }
    >
      <div className="flex items-center space-x-2">
        <img
          className="object-cover w-8 h-8 rounded-full"
          src={user.picture.thumbnail}
        />
        <div>
          <div className="text-sm font-medium text-gray-600">
            {user.name.first} {user.name.last}
          </div>
          <div className="text-xs text-gray-400">{user.username}</div>
        </div>
      </div>
    </Popover>
  )
}
