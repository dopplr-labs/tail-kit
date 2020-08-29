import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function TrendingUpOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 7H21M21 7V15M21 7L13 15L9 11L3 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
