import React, { useMemo, cloneElement } from 'react'
import clsx from 'clsx'

export type AvatarProps = {
  children?: string
  className?: string
  icon?: React.ReactElement
  shape?: 'circle' | 'square'
  size?: 'large' | 'default' | 'small'
  style?: React.CSSProperties
}

export function Avatar({
  children,
  className,
  icon,
  shape = 'circle',
  size = 'default',
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
    if (icon) {
      return cloneElement(icon, {
        className: clsx('text-white', iconSize, icon.props.className),
      })
    }
    if (children !== undefined) {
      return children
    }
  }, [children, icon, iconSize])

  return (
    <div
      className={clsx(
        'bg-gray-300 flex items-center justify-center text-white',
        avatarSize,
        shape === 'circle' ? 'rounded-full' : undefined,
        className,
      )}
      style={style}
    >
      {avatarContent}
    </div>
  )
}
