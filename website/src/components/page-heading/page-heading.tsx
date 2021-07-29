import clsx from 'clsx'
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
      className: clsx(
        'flex items-center space-x-2 group',
        (() => {
          // as the nav bar is having height of 56px, so we need to add pt-[56px] and -mt-[56px]
          // in each element, but each element already have its own margin top, so we need to offset that
          if (type === 'h1') {
            return 'pt-14 -mt-14'
          }

          if (type === 'h2') {
            // as the margintop is already 2em
            return 'pt-14 !-mt-6'
          }

          if (type === 'h3') {
            // as the margintop is already 1.6em
            return 'pt-14 !mt-[-30px]'
          }

          return undefined
        })(),
      ),
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
