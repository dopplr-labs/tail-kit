import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function LightningBoltOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M13 10V3L4 14H11L11 21L20 10L13 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
