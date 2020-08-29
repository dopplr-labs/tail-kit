import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ViewListOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6H20M4 10H20M4 14H20M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
