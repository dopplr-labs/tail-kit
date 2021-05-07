import React, { cloneElement } from 'react'

/**
 * AvatarGroup Properties
 */
export type AvatarGroupProps = {
  children: React.ReactNode
  maxCount?: number
}

export function AvatarGroup({ children, maxCount }: AvatarGroupProps) {
  if (maxCount && React.Children.count(children) > maxCount) {
    const childrenArr = React.Children.toArray(children)
    const childrenShow = childrenArr.slice(0, maxCount)
    return (
      <div className="flex items-center">
        {React.Children.map(childrenShow, (child) =>
          cloneElement(child as React.ReactElement, {
            className: '-ml-2 border border-white',
          }),
        )}
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
