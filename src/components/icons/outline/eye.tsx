import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function EyeOutline({ className = 'w-6 h-6', style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M14.9998 12C14.9998 13.6569 13.6566 15 11.9998 15C10.3429 15 8.99976 13.6569 8.99976 12C8.99976 10.3431 10.3429 9 11.9998 9C13.6566 9 14.9998 10.3431 14.9998 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.45801 12C3.73228 7.94288 7.52257 5 12.0002 5C16.4778 5 20.2681 7.94291 21.5424 12C20.2681 16.0571 16.4778 19 12.0002 19C7.52256 19 3.73226 16.0571 2.45801 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
