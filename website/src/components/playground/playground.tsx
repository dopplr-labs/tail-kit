import React from 'react'
import clsx from 'clsx'
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live'
import { HiPencil } from 'react-icons/hi'
import * as tailKit from '@tail-kit/tail-kit'
import theme from 'prism-react-renderer/themes/vsDark'
import CopyButton from 'components/copy-button'

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
            <CopyButton code={code} className="absolute top-0 z-20 right-4" />

            <LiveEditor
              className={clsx(
                '!font-mono text-sm live-editor',
                !editable ? 'rounded-b-md' : undefined,
              )}
              disabled={!editable}
            />

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
