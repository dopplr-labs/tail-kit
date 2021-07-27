import React, { useRef, useState } from 'react'
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live'
import * as TailKit from '@tail-kit/tail-kit'
import theme from 'prism-react-renderer/themes/nightOwl'
import copy from 'copy-to-clipboard'

type PlaygroundProps = {
  code?: string
  scope?: { [key: string]: any }
}

export function Playground({ code, scope = {} }: PlaygroundProps) {
  const [codeVisible, setCodeVisible] = useState(true)
  const [codeCopied, setCodeCopied] = useState(false)
  const timeout = useRef(null)

  if (!code) {
    return null
  }

  return (
    <LiveProvider
      code={code.trim()}
      scope={{ ...TailKit, ...scope }}
      theme={theme}
    >
      <div>
        <div className="border rounded-md">
          <LivePreview className="relative p-4" />
          <div className="relative">
            <div className="absolute top-0 z-20 flex items-center justify-end w-full px-4 space-x-4">
              {codeVisible ? (
                <button
                  className="px-2 py-1 text-xs border rounded-b-md bg-gray-50"
                  onClick={() => {
                    copy(code)

                    if (timeout.current) {
                      window.clearTimeout(timeout.current)
                    }

                    setCodeCopied(true)
                    timeout.current = setTimeout(() => {
                      setCodeCopied(false)
                    }, 3000)
                  }}
                >
                  {codeCopied ? 'Copied' : 'Copy Code'}
                </button>
              ) : null}
              <button
                className="px-2 py-1 text-xs border rounded-b-md bg-gray-50"
                onClick={() => {
                  setCodeVisible((prevState) => !prevState)
                }}
              >
                {codeVisible ? 'Hide' : 'Show'} Code
              </button>
            </div>
            {codeVisible ? (
              <LiveEditor
                className="!font-mono text-sm leading-6 rounded-b-md live-editor"
                disabled
              />
            ) : null}
          </div>
        </div>
        <LiveError className="px-4 py-2 mt-2 text-xs text-red-500 rounded-md bg-red-50" />
      </div>
    </LiveProvider>
  )
}
