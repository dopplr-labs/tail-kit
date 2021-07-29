import constate from 'constate'
import { HeadingNode } from 'plugins/rehype-heading'
import { useEffect, useMemo, useState } from 'react'

function useHeadings({
  headings,
  offsetTop = 0,
}: {
  headings: HeadingNode[]
  offsetTop?: number
}) {
  const [positions, setPositions] = useState<{
    [key: string]: number
  }>({})
  const slugs = headings.map((heading) => heading.slug)
  const items = useMemo(
    () =>
      typeof window !== 'undefined'
        ? slugs.map((slug) => document.getElementById(slug))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...slugs],
  )

  useEffect(
    function checkHeadingPositionsOnIntersetionChange() {
      const observer = new IntersectionObserver(() => {
        const updatedEntries = {}
        items.forEach((item) => {
          updatedEntries[item?.id] = item?.getBoundingClientRect()?.top ?? 0
        })
        setPositions(updatedEntries)
      })

      items.forEach((item) => {
        observer.observe(item)
      })

      return () => {
        items.forEach((item) => {
          observer.unobserve(item)
        })
        observer.disconnect()
      }
    },
    [items],
  )

  const activeHeading = Object.entries(positions)
    .filter(([, position]) => position > offsetTop)
    .sort(([, positionA], [, positionB]) => positionA - positionB)?.[0]?.[0]

  return {
    activeHeading,
  }
}

export const [HeadingsProvider, useHeadingsContext] = constate(useHeadings)
