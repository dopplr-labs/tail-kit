import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function MinusOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 12H4"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
