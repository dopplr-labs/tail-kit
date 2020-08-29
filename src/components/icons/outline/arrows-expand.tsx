import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ArrowsExpandOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8V4M4 4H8M4 4L9 9M20 8V4M20 4H16M20 4L15 9M4 16V20M4 20H8M4 20L9 15M20 20L15 15M20 20V16M20 20H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
