import clsx from 'clsx'
import copy from 'copy-to-clipboard'
import React, { useRef, useState } from 'react'

type CopyButtonProps = {
  code: string
  className?: string
  style?: React.CSSProperties
}

export function CopyButton({ code, className, style }: CopyButtonProps) {
  const [codeCopied, setCodeCopied] = useState(false)
  const timeout = useRef(null)

  function handleCopyCode() {
    copy(code)

    if (timeout.current) {
      window.clearTimeout(timeout.current)
    }

    setCodeCopied(true)
    timeout.current = setTimeout(() => {
      setCodeCopied(false)
    }, 3000)
  }

  return (
    <button
      className={clsx(
        'px-2 py-1 text-xs border rounded-b-md bg-gray-50 text-gray-800 font-sans',
        className,
      )}
      style={style}
      onClick={handleCopyCode}
    >
      {codeCopied ? 'Copied' : 'Copy Code'}
    </button>
  )
}
