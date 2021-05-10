import React from 'react'
/**
 * AvatarGroup Properties
 */
export declare type AvatarGroupProps = {
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
export declare function AvatarGroup({
  children,
  maxCount,
  maxPopoverPlacement,
  maxStyle,
  size,
}: AvatarGroupProps): JSX.Element
