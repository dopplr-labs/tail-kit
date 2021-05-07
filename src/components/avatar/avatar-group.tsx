import React, { cloneElement } from 'react'
import Popover from 'components/popover'
import Avatar from '.'

/**
 * AvatarGroup Properties
 */
export type AvatarGroupProps = {
  children: React.ReactNode
  maxCount?: number
  maxStyle?: React.CSSProperties
}

export function AvatarGroup({
  children,
  maxCount,
  maxStyle,
}: AvatarGroupProps) {
  if (maxCount && React.Children.count(children) > maxCount) {
    const childrenArr = React.Children.toArray(children)
    const childrenShow = childrenArr.slice(0, maxCount)
    const childrenHide = childrenArr.slice(maxCount)
    const extraChildren = React.Children.count(children) - maxCount
    return (
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
        >
          <Avatar
            className="-ml-2 text-sm border border-white"
            style={maxStyle}
          >
            {`+${extraChildren.toString()}`}
          </Avatar>
        </Popover>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      {React.Children.map(children, (child) =>
        cloneElement(child as React.ReactElement, {
          className: '-ml-2 border border-white',
        }),
      )}
    </div>
  )
}
