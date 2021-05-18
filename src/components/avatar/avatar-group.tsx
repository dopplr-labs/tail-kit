import React from 'react'
import clsx from 'clsx'
import Popover from 'components/popover'
import Avatar from '.'
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
        <div className="flex items-center">
          {React.Children.map(childrenShow, (child, index) => (
            <div key={index} className="-ml-2 border border-white rounded-full">
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
              className={clsx(
                '-ml-2 text-sm border border-white',
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
      <div className="flex items-center">
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="inline-block -ml-2 border border-white rounded-full"
          >
            {child}
          </div>
        ))}
      </div>
    </AvatarContext.Provider>
  )
}
