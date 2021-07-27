import React, { Children } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import clsx from 'clsx'
import { CopyButton } from 'components/copy-button/copy-button'

type CodeBlockProps = {
  children: React.ReactNode
}

/**
 * Component to render code blocks using prism-react-renderer.
 */
export function CodeBlock({ children }: CodeBlockProps) {
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

          <CopyButton code={codeContent} className="absolute top-0 right-4" />
        </pre>
      )}
    </Highlight>
  )
}
