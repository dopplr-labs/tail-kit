import React, { useRef, useState } from 'react'
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live'
import { HiPencil } from 'react-icons/hi'
import * as tailKit from '@tail-kit/tail-kit'
import theme from 'prism-react-renderer/themes/nightOwl'
import copy from 'copy-to-clipboard'
import clsx from 'clsx'

type PlaygroundProps = {
  code?: string
  scope?: { [key: string]: any }
  editable?: boolean
}

export function Playground({
  code,
  scope = {},
  editable = false,
}: PlaygroundProps) {
  const [codeVisible, setCodeVisible] = useState(true)
  const [codeCopied, setCodeCopied] = useState(false)
  const timeout = useRef(null)

  if (!code) {
    return null
  }

  return (
    <LiveProvider
      code={code.trim()}
      scope={{
        // pass tail-kit as the scope as all the components present in tail-kit would be somewhere or the used in the playground
        ...tailKit,
        ...scope,
      }}
      theme={theme}
    >
      <div>
        <div className="border rounded-md">
          <LivePreview className="relative p-4" />

          <div className="relative">
            {/* Toolbar */}
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
                className={clsx(
                  '!font-mono text-sm leading-6 live-editor',
                  !editable ? 'rounded-b-md' : undefined,
                )}
                disabled={!editable}
              />
            ) : null}

            {editable ? (
              <div className="flex items-center px-4 py-2 space-x-2 text-xs font-medium bg-gray-100">
                <HiPencil size={16} />
                <span>Editable Example</span>
              </div>
            ) : null}
          </div>
        </div>

        <LiveError className="px-4 py-2 mt-2 text-xs text-red-500 rounded-md bg-red-50" />
      </div>
    </LiveProvider>
  )
}
