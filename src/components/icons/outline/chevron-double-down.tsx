import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ChevronDoubleDownOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M19 13L12 20L5 13M19 5L12 12L5 5"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
