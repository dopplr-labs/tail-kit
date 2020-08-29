import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function TableOutline({ className = 'w-6 h-6', style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10H21M3 14H21M12 10V18M5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
