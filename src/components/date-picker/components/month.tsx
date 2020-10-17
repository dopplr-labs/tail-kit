import clsx from 'clsx'
import React from 'react'

export type MonthProps = {
  className?: string
  style?: React.CSSProperties
}

export function Month({ className, style }: MonthProps) {
  return <div className={clsx(className)} style={style} />
}
