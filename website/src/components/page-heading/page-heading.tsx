import React, { useMemo } from 'react'
import { HiLink } from 'react-icons/hi'

type PageHeadingProps = {
  id: string
  children: string
  type: 'h1' | 'h2' | 'h3'
}

export function PageHeading({ id, children, type }: PageHeadingProps) {
  const content = useMemo(
    function renderHeading() {
      if (type === 'h1') {
        return <h1 id={id}>{children}</h1>
      }

      if (type === 'h2') {
        return <h2 id={id}>{children}</h2>
      }

      if (type === 'h3') {
        return <h3 id={id}>{children}</h3>
      }

      return null
    },
    [id, children, type],
  )

  return (
    <div className="relative group">
      <a
        href={`#${id}`}
        className="absolute top-1/2 -translate-y-1/2 left-0 translate-x-[calc(-100%-12px)] tranform opacity-0 group-hover:opacity-100 duration-100 transition-opacity"
      >
        <HiLink size={20} />
      </a>
      {content}
    </div>
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
