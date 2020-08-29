import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function SortDescendingOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 4H16M3 8H12M3 12H12M17 8V20M17 20L13 16M17 20L21 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
