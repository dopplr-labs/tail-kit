import clsx from 'clsx'
import React, { cloneElement } from 'react'
import { useMemo } from 'use-memo-one'

export type AvatarProps = {
  className?: string
  icon?: React.ReactElement
  shape?: 'circle' | 'square'
  size?: 'large' | 'default' | 'small'
}

export function Avatar({
  className,
  icon,
  shape = 'circle',
  size = 'default',
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

  return (
    <div
      className={clsx(
        'flex items-center justify-center bg-gray-300',
        shape === 'circle' ? 'rounded-full' : undefined,
        avatarSize,
        className,
      )}
    >
      {icon
        ? cloneElement(icon, {
            className: clsx('text-white', iconSize, icon.props.className),
          })
        : null}
    </div>
  )
}
