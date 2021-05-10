import React from 'react'
import Popover from 'components/popover'
import Avatar from '.'
import AvatarContext from './avatar-context'

/**
 * AvatarGroup Properties
 */
export type AvatarGroupProps = {
  /** Render Avatars in AvatarGroup as children */
  children: React.ReactNode
  /** Maximum number of Avatars to show */
  maxCount?: number
  /** The placement of excess avatar Popover */
  maxPopoverPlacement?: 'top' | 'bottom'
  /** Customize style of excess avatar */
  maxStyle?: React.CSSProperties
  /** The size of the avatar */
  size?: 'large' | 'default' | 'small'
}

export function AvatarGroup({
  children,
  maxCount,
  maxPopoverPlacement = 'top',
  maxStyle,
  size = 'default',
}: AvatarGroupProps) {
  if (maxCount && React.Children.count(children) > maxCount) {
    const childrenArr = React.Children.toArray(children)
    const childrenShow = childrenArr.slice(0, maxCount)
    const childrenHide = childrenArr.slice(maxCount)
    const extraChildren = React.Children.count(children) - maxCount
    return (
      <AvatarContext.Provider value={{ size }}>
        <div className="flex items-center">
          {React.Children.map(childrenShow, (child) => (
            <div className="-ml-2 border border-white rounded-full">
              {child}
            </div>
          ))}
          <Popover
            content={
              <div className="flex items-center space-x-1">{childrenHide}</div>
            }
            placement={maxPopoverPlacement}
          >
            <Avatar
              className="-ml-2 text-sm border border-white"
              style={maxStyle}
            >
              {`+${extraChildren.toString()}`}
            </Avatar>
          </Popover>
        </div>
      </AvatarContext.Provider>
    )
  }

  return (
    <AvatarContext.Provider value={{ size }}>
      <div className="flex items-center">
        {React.Children.map(children, (child) => (
          <div className="inline-block -ml-2 border border-white rounded-full">
            {child}
          </div>
        ))}
      </div>
    </AvatarContext.Provider>
  )
}
