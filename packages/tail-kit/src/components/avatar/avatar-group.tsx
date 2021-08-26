import React from 'react'
import clsx from 'clsx'
import Popover from 'components/popover'
import { Avatar } from './avatar'
import AvatarContext from './avatar-context'

/**
 * AvatarGroup Properties
 */
export type AvatarGroupProps = {
  /** Render Avatars in AvatarGroup as children */
  children: React.ReactNode
  /** Customize style of excess avatar */
  excessAvatarClassName?: string
  /** Customize style of excess avatar */
  excessAvatarStyle?: React.CSSProperties
  /** Maximum number of Avatars to show */
  maxCount?: number
  /** The placement of excess avatar Popover */
  maxPopoverPlacement?: 'top' | 'bottom'
  /** The size of the avatar */
  size?: 'large' | 'default' | 'small'
}

export function AvatarGroup({
  children,
  excessAvatarClassName,
  excessAvatarStyle,
  maxCount,
  maxPopoverPlacement = 'top',
  size = 'default',
}: AvatarGroupProps) {
  const childrenCount = React.Children.count(children)

  if (maxCount && childrenCount > maxCount) {
    const childrenArr = React.Children.toArray(children)
    const childrenShow = childrenArr.slice(0, maxCount)
    const childrenHide = childrenArr.slice(maxCount)
    const extraChildren = childrenCount - maxCount
    return (
      <AvatarContext.Provider value={{ size }}>
        <div className="flex items-center -space-x-2">
          {childrenShow}
          <Popover
            content={
              <div className="flex items-center px-3 py-2 space-x-2">
                {childrenHide}
              </div>
            }
            placement={maxPopoverPlacement}
          >
            <Avatar
              className={clsx(
                'border border-white',
                size === 'small' ? 'text-xs' : 'text-sm',
                excessAvatarClassName,
              )}
              style={excessAvatarStyle}
            >
              {`+${extraChildren}`}
            </Avatar>
          </Popover>
        </div>
      </AvatarContext.Provider>
    )
  }

  return (
    <AvatarContext.Provider value={{ size }}>
      <div className="flex items-center -space-x-2">{children}</div>
    </AvatarContext.Provider>
  )
}
