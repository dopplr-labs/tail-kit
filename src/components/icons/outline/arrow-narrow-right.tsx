import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ArrowNarrowRightOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M17 8L21 12M21 12L17 16M21 12L3 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
