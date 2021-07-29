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
          'block font-medium relative text-sm',
          heading.slug === activeHeading
            ? 'text-gray-800 before:w-0.5 before:bg-gray-800 before:absolute before:transform before:-translate-x-2 before:top-0.5 before:bottom-0.5'
            : 'text-gray-400 hover:text-gray-800',
        )}
      >
        {heading.name}
      </a>
      {heading.children.length > 0 ? (
        <div className="pl-2 space-y-2">
          {heading.children.map((heading) => (
            <Heading key={heading.slug} heading={heading} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
