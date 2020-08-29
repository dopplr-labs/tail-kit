import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function LibraryOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M8 14V17M12 14V17M16 14V17M3 21H21M3 10H21M3 7L12 3L21 7M4 10H20V21H4V10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
