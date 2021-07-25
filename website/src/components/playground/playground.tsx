import React from 'react'
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live'
import { Button } from '@tail-kit/tail-kit'
import theme from 'prism-react-renderer/themes/nightOwl'

type PlaygroundProps = {
  children: string
}

export function Playground({ children }: PlaygroundProps) {
  return (
    <LiveProvider code={children} scope={{ Button }} theme={theme}>
      <div>
        <div className="p-4 border rounded-t-md">
          <LivePreview />
        </div>
        <LiveEditor className="font-mono text-sm rounded-b-md" />
        <LiveError />
      </div>
    </LiveProvider>
  )
}
