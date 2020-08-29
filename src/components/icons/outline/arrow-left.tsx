import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ArrowLeftOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M10 19L3 12M3 12L10 5M3 12L21 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
