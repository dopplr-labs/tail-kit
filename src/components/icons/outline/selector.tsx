import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function SelectorOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M8 9L12 5L16 9M16 15L12 19L8 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
