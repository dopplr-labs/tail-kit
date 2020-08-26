import React from 'react'
import clsx from 'clsx'

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  style?: React.CSSProperties
}

export default function Button({ children, className, style }: Props) {
  return (
    <button className={clsx(className)} style={style}>
      <span>{children}</span>
    </button>
  )
}
