import React, { cloneElement } from 'react'
import Popover from 'components/popover'
import Avatar from '.'
import AvatarContext from './avatar-context'

/**
 * AvatarGroup Properties
 */
export type AvatarGroupProps = {
  children: React.ReactNode
  maxCount?: number
  maxPopoverPlacement?: 'top' | 'bottom'
  maxStyle?: React.CSSProperties
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
          {React.Children.map(childrenShow, (child) =>
            cloneElement(child as React.ReactElement, {
              className: '-ml-2 border border-white',
            }),
          )}
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
        {React.Children.map(children, (child) =>
          cloneElement(child as React.ReactElement, {
            className: '-ml-2 border border-white',
          }),
        )}
      </div>
    </AvatarContext.Provider>
  )
}
