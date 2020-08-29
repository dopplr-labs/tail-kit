import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ChevronDoubleLeftOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M11 19L4 12L11 5M19 19L12 12L19 5"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
