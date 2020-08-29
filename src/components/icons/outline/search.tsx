import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function SearchOutline({ className = 'w-6 h-6', style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
