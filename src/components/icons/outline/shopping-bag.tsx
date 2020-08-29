import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ShoppingBagOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
