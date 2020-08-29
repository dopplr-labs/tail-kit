import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function TranslateOutline({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 5H15M9 3V5M10.0482 14.5C8.52083 12.9178 7.28073 11.0565 6.41187 9M12.5 18H19.5M11 21L16 11L21 21M12.7511 5C11.7831 10.7702 8.06969 15.6095 3 18.129"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
