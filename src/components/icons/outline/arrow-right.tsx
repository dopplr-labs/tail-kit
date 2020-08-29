import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ArrowRightOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M14 5L21 12M21 12L14 19M21 12L3 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
