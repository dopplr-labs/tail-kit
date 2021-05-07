import React, { useMemo, cloneElement } from 'react'
import clsx from 'clsx'
import { AvatarGroup } from './avatar-group'

/**
 * Avatar Properties
 */
export type AvatarProps = {
  /** Add alternating text describing the image if you are using src prop */
  alt?: string
  /** Render string inside Avatar */
  children?: string
  /** Customize Avatar styles using className */
  className?: string
  /** Render custom icon inside Avatar */
  icon?: React.ReactElement
  /** The shape of Avatar */
  shape?: 'circle' | 'square'
  /** The size of Avatar */
  size?: 'large' | 'default' | 'small'
  /** Image source address to render inside Avatar */
  src?: string
  /** Customize Avatar styles using style prop */
  style?: React.CSSProperties
}

export function Avatar({
  alt,
  children,
  className,
  icon,
  shape = 'circle',
  size = 'default',
  src,
  style,
}: AvatarProps) {
  const avatarSize = useMemo(() => {
    if (size === 'default') {
      return 'w-8 h-8'
    }
    if (size === 'large') {
      return 'w-12 h-12'
    }
    if (size === 'small') {
      return 'w-6 h-6'
    }
  }, [size])

  const iconSize = useMemo(() => {
    if (size === 'default') {
      return 'w-5 h-5'
    }
    if (size === 'large') {
      return 'w-8 h-8'
    }
    if (size === 'small') {
      return 'w-4 h-4'
    }
  }, [size])

  const avatarContent = useMemo(() => {
    if (src) {
      return (
        <img
          src={src}
          className={clsx(
            'object-cover w-full h-full',
            shape === 'circle' ? 'rounded-full' : undefined,
          )}
          alt={alt}
        />
      )
    }
    if (icon) {
      return cloneElement(icon, {
        className: clsx('text-white', iconSize, icon.props.className),
      })
    }
    if (children) {
      return children
    }
    return null
  }, [alt, children, icon, iconSize, shape, src])

  return (
    <div
      className={clsx(
        'flex items-center justify-center text-white',
        avatarSize,
        !src ? 'bg-gray-300 overflow-hidden' : undefined,
        shape === 'circle' ? 'rounded-full' : undefined,
        className,
      )}
      style={style}
    >
      {avatarContent}
    </div>
  )
}

Avatar.Group = AvatarGroup
