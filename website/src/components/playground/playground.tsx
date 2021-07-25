import React from 'react'
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live'
import * as TailKit from '@tail-kit/tail-kit'
import * as prettier from 'prettier'
import theme from 'prism-react-renderer/themes/github'

type PlaygroundProps = {
  code: string
  scope?: { [key: string]: any }
}

export function Playground({ code, scope = {} }: PlaygroundProps) {
  return (
    <LiveProvider
      code={code.trim()}
      scope={{ ...TailKit, ...scope }}
      theme={theme}
    >
      <div>
        <div className="overflow-hidden border rounded-md">
          <LivePreview className="p-4 border-b" />
          <LiveEditor className="font-mono text-sm rounded-b-md" />
        </div>
        <LiveError className="px-4 py-2 mt-2 text-xs text-red-500 rounded-md bg-red-50" />
      </div>
    </LiveProvider>
  )
}
