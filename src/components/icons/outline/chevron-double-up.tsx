import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ChevronDoubleUpOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 11L12 4L19 11M5 19L12 12L19 19"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
