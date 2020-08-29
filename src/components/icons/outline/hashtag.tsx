import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function HashtagOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M7 20L11 4M13 20L17 4M6 9H20M4 15H18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
