import React from 'react'

type Props = {
  className?: string
  style?: React.CSSProperties
}

export default function FolderDownloadSolid({
  className = 'w-6 h-6',
  style,
}: Props) {
  return (
    <svg className={className} style={style} viewBox="0 0 20 20" fill="none">
      <path
        d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6H16C17.1046 6 18 6.89543 18 8V14C18 15.1046 17.1046 16 16 16H4C2.89543 16 2 15.1046 2 14V6Z"
        fill="currentColor"
      />
      <path
        d="M10 9V13M10 13L8 11M10 13L12 11"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
