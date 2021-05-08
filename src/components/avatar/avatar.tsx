import React, { useMemo, cloneElement, useContext } from 'react'
import clsx from 'clsx'
import AvatarContext from './avatar-context'

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
  size,
  src,
  style,
}: AvatarProps) {
  const { size: groupSize } = useContext(AvatarContext)
  const preferredSize = size ?? groupSize

  const avatarSize = useMemo(() => {
    switch (preferredSize) {
      case 'default':
        return 'w-8 h-8'
      case 'large':
        return 'w-12 h-12'
      case 'small':
        return 'w-6 h-6'
      default:
        return 'w-8 h-8'
    }
  }, [preferredSize])

  const iconSize = useMemo(() => {
    switch (preferredSize) {
      case 'default':
        return 'w-5 h-5'
      case 'large':
        return 'w-8 h-8'
      case 'small':
        return 'w-4 h-4'
      default:
        return 'w-5 h-5'
    }
  }, [preferredSize])

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
