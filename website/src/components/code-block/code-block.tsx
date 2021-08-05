import React, { Children } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import clsx from 'clsx'
import CopyButton from 'components/copy-button'
import format from 'utils/format'

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
  // format code using prettier
  const codeContent = format(codeChild.props.children)

  return (
    <div className="relative">
      <Highlight
        {...defaultProps}
        code={codeContent}
        language={language as Language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={clsx(
              'text-xs lg:text-sm relative p-4 overflow-auto max-w-full',
              className,
            )}
            style={{ ...style }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <CopyButton
        code={codeContent}
        className="absolute top-0 hidden right-4 lg:block"
      />
    </div>
  )
}
