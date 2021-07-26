import constate from 'constate'
import { HeadingNode } from 'plugins/rehype-heading'
import { useEffect, useRef, useState } from 'react'

function useHeadings({
  headings,
}: {
  headings: HeadingNode[]
  container: HTMLDivElement
}) {
  const [activeHeading, setActiveHeading] = useState<string | undefined>(
    undefined,
  )
  const minPos = useRef(Number.POSITIVE_INFINITY)
  const entryId = useRef<string | undefined>(undefined)

  useEffect(
    function checkActiveHeading() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.boundingClientRect.top < minPos.current) {
            minPos.current = entry.boundingClientRect.top
            entryId.current = entry.target.id
          }
        })

        if (entryId) {
          minPos.current = Number.POSITIVE_INFINITY
          setActiveHeading(entryId.current)
        }
      })

      headings.forEach((heading) => {
        const item = document.getElementById(heading.slug)
        observer.observe(item)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return {
    activeHeading,
  }
}

export const [HeadingsProvider, useHeadingsContext] = constate(useHeadings)
