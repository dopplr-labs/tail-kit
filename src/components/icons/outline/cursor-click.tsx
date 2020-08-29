import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function CursorClickOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M14.9998 15L12.9998 20L8.99983 9L19.9998 13L14.9998 15ZM14.9998 15L19.9998 20M7.18806 2.23853L7.96452 5.1363M5.13606 7.96472L2.23828 7.18826M13.9495 4.05029L11.8282 6.17161M6.17146 11.8284L4.05014 13.9497"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
