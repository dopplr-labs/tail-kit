import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ArrowsExpandSolid({ className, style }: Props) {
  return (
    <svg
      className={className}
      style={style}
      width="19"
      viewBox="0 0 19 20"
      fill="none"
    >
      <path
        d="M3 8V4M3 4H7M3 4L7 8M15 8V4M15 4H11M15 4L11 8M3 12V16M3 16H7M3 16L7 12M15 16L11 12M15 16V12M15 16H11"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
