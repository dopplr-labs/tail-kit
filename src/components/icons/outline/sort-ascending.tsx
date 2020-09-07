import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function SortAscendingOutline({
  className = 'w-6 h-6',
  style,
  ...restProps
}: Props) {
  return (
    <svg
      className={className}
      style={style}
      {...restProps}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 4H16M3 8H12M3 12H9M13 12L17 8M17 8L21 12M17 8V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
