import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function DeviceMobileSolid({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 2C5.89543 2 5 2.89543 5 4V16C5 17.1046 5.89543 18 7 18H13C14.1046 18 15 17.1046 15 16V4C15 2.89543 14.1046 2 13 2H7ZM10 16C10.5523 16 11 15.5523 11 15C11 14.4477 10.5523 14 10 14C9.44772 14 9 14.4477 9 15C9 15.5523 9.44772 16 10 16Z"
        fill="currentColor"
      />
    </svg>
  )
}