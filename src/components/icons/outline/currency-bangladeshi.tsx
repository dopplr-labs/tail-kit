import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function CurrencyBangladeshiOutline({
  className,
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M11 11V9C11 7.89543 10.1046 7 9 7M11 11V15C11 16.1046 11.8954 17 13 17C14.1046 17 15 16.1046 15 15V14M11 11H9M11 11H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
