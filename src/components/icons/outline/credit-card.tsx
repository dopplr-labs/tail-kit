import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function CreditCardOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10H21M7 15H8M12 15H13M6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
