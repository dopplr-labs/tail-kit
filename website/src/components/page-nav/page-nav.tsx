import clsx from 'clsx'
import Heading from 'components/heading'
import { HeadingsProvider } from 'hooks/use-headings'
import { HeadingNode } from 'plugins/rehype-heading'
import React, { useMemo } from 'react'

type PageNavProps = {
  headings: HeadingNode[]
  className?: string
  style?: React.CSSProperties
}

export function PageNav({ headings, className, style }: PageNavProps) {
  const allHeadings = useMemo(
    () => [
      // first level
      ...headings,
      // second level
      ...headings.flatMap((heading) => heading.children),
    ],
    [headings],
  )

  return (
    // offsetTop is used to offset the top of the container is having a padding of 32px
    <HeadingsProvider headings={allHeadings} offsetTop={-32}>
      <div className={clsx('space-y-4', className)} style={style}>
        {headings.map((heading) => (
          <Heading heading={heading} key={heading.slug} />
        ))}
      </div>
    </HeadingsProvider>
  )
}
