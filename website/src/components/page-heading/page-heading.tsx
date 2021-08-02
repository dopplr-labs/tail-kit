import React, { createElement } from 'react'
import { HiLink } from 'react-icons/hi'

type PageHeadingProps = {
  id: string
  children: string
  type: 'h1' | 'h2' | 'h3'
}

export function PageHeading({ id, children, type }: PageHeadingProps) {
  return createElement(
    type,
    {
      id,
      className: 'flex items-center space-x-2 group',
    },
    <>
      <span>{children}</span>
      <a
        aria-label="anchor"
        href={`#${id}`}
        className="transition-opacity duration-100 opacity-0 group-hover:opacity-100"
      >
        <HiLink size={20} />
      </a>
    </>,
  )
}

export function PageHeadingH1(props: Omit<PageHeadingProps, 'type'>) {
  return <PageHeading type="h1" {...props} />
}

export function PageHeadingH2(props: Omit<PageHeadingProps, 'type'>) {
  return <PageHeading type="h2" {...props} />
}

export function PageHeadingH3(props: Omit<PageHeadingProps, 'type'>) {
  return <PageHeading type="h3" {...props} />
}
