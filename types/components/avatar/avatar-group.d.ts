import React from 'react'
/**
 * AvatarGroup Properties
 */
export declare type AvatarGroupProps = {
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
export declare function AvatarGroup({
  children,
  excessAvatarClassName,
  excessAvatarStyle,
  maxCount,
  maxPopoverPlacement,
  size,
}: AvatarGroupProps): JSX.Element
