import React, { Children, useRef, useState } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import clsx from 'clsx'
import copy from 'copy-to-clipboard'

type CodeBlockProps = {
  children: React.ReactNode
}

/**
 * Component to render code blocks using prism-react-renderer.
 */
export function CodeBlock({ children }: CodeBlockProps) {
  const [codeCopied, setCodeCopied] = useState(false)
  const timeout = useRef(null)

  const codeChild = Children.toArray(children).find(
    // @ts-ignore
    (child) => child.type === 'code',
  ) as React.ReactElement<{ children: string; className: string }> | undefined

  if (!codeChild) {
    return null
  }

  // the className would be something like language-jsx for a JSX block
  const language = codeChild.props.className.replace(/language-/, '')
  // the code content would be the code children
  const codeContent = codeChild.props.children.trim()

  return (
    <Highlight
      {...defaultProps}
      code={codeContent}
      language={language as Language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx('text-sm leading-6 relative', className)}
          style={{ ...style, padding: '20px' }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}

          <button
            className="absolute top-0 px-2 py-1 font-sans text-xs text-gray-800 border rounded-b-md bg-gray-50 right-4"
            onClick={() => {
              copy(codeContent)

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
        </pre>
      )}
    </Highlight>
  )
}
