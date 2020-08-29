import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ChevronDoubleRightOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 5L20 12L13 19M5 5L12 12L5 19"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
