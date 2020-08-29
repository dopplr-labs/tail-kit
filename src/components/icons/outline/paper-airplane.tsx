import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function PaperAirplaneOutline({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 19L21 21L12 3L3 21L12 19ZM12 19V11"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
