import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function QrcodeSolid({ className, style }: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 4C3 3.44772 3.44772 3 4 3H7C7.55228 3 8 3.44772 8 4V7C8 7.55228 7.55228 8 7 8H4C3.44772 8 3 7.55228 3 7V4ZM5 6V5H6V6H5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 13C3 12.4477 3.44772 12 4 12H7C7.55228 12 8 12.4477 8 13V16C8 16.5523 7.55228 17 7 17H4C3.44772 17 3 16.5523 3 16V13ZM5 15V14H6V15H5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 3C12.4477 3 12 3.44772 12 4V7C12 7.55228 12.4477 8 13 8H16C16.5523 8 17 7.55228 17 7V4C17 3.44772 16.5523 3 16 3H13ZM14 5V6H15V5H14Z"
        fill="currentColor"
      />
      <path
        d="M11 4C11 3.44772 10.5523 3 10 3C9.44772 3 9 3.44772 9 4V5C9 5.55228 9.44772 6 10 6C10.5523 6 11 5.55228 11 5V4Z"
        fill="currentColor"
      />
      <path
        d="M10 7C10.5523 7 11 7.44772 11 8V9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H10C9.44772 11 9 10.5523 9 10V8C9 7.44772 9.44772 7 10 7Z"
        fill="currentColor"
      />
      <path
        d="M16 9C15.4477 9 15 9.44772 15 10C15 10.5523 15.4477 11 16 11C16.5523 11 17 10.5523 17 10C17 9.44772 16.5523 9 16 9Z"
        fill="currentColor"
      />
      <path
        d="M9 13C9 12.4477 9.44772 12 10 12H11C11.5523 12 12 12.4477 12 13C12 13.5523 11.5523 14 11 14V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V13Z"
        fill="currentColor"
      />
      <path
        d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44772 7.55228 9 7 9H4C3.44772 9 3 9.44771 3 10C3 10.5523 3.44772 11 4 11H7Z"
        fill="currentColor"
      />
      <path
        d="M17 13C17 13.5523 16.5523 14 16 14H14C13.4477 14 13 13.5523 13 13C13 12.4477 13.4477 12 14 12H16C16.5523 12 17 12.4477 17 13Z"
        fill="currentColor"
      />
      <path
        d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15H13C12.4477 15 12 15.4477 12 16C12 16.5523 12.4477 17 13 17H16Z"
        fill="currentColor"
      />
    </svg>
  )
}
