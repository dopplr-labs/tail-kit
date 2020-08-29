import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function ArrowNarrowUpOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M8 7L12 3M12 3L16 7M12 3V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
