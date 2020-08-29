import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function CurrencyBangladeshiSolid({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM7 4C6.44772 4 6 4.44772 6 5C6 5.55228 6.44772 6 7 6C7.55228 6 8 6.44772 8 7V8H7C6.44772 8 6 8.44772 6 9C6 9.55228 6.44772 10 7 10H8V13C8 14.6569 9.34315 16 11 16C12.6569 16 14 14.6569 14 13V12C14 11.4477 13.5523 11 13 11C12.4477 11 12 11.4477 12 12V13C12 13.5523 11.5523 14 11 14C10.4477 14 10 13.5523 10 13V10H13C13.5523 10 14 9.55228 14 9C14 8.44772 13.5523 8 13 8H10V7C10 5.34315 8.65685 4 7 4Z"
        fill="#374151"
      />
    </svg>
  )
}
