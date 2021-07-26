import React from 'react'
import clsx from 'clsx'
import { HeadingNode } from 'plugins/rehype-heading'
import { useHeadingsContext } from 'hooks/use-headings'

export type HeadingProps = {
  heading: HeadingNode
}

export function Heading({ heading }: HeadingProps) {
  const { activeHeading } = useHeadingsContext()

  return (
    <div className="space-y-2">
      <a
        href={`#${heading.slug}`}
        className={clsx(
          'block ',
          heading.slug === activeHeading
            ? 'text-gray-800'
            : 'text-gray-400 hover:text-gray-800',
          heading.type === 'h2' ? 'text-base' : 'text-sm',
        )}
      >
        {heading.name}
      </a>
      {heading.children.length > 0 ? (
        <div className="pl-4 space-y-2">
          {heading.children.map((heading) => (
            <Heading key={heading.slug} heading={heading} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
