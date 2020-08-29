import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function CodeOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
