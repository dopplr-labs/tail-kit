import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function PlusSmOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6V12M12 12V18M12 12H18M12 12L6 12"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
