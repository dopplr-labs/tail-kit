import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function TrendingDownOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 17H21M21 17V9M21 17L13 9L9 13L3 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
