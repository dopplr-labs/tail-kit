import React, { useEffect, useMemo } from 'react'
import { Link } from 'gatsby'
import { useDocs, useCurrentDoc } from 'docz'

export const MainContainer = ({ children, ...restProps }) => {
  const docs = useDocs()
  const current = useCurrentDoc()
  const { route } = current

  const headings = useMemo(() => {
    return docs
      .find((doc) => doc.route === current.route)
      .headings.filter((heading) => heading.depth === 2)
  }, [docs, current.route])

  // Highlight active section in Table of Contents
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        if (entry.intersectionRatio > 0) {
          document
            .querySelector(`a[href="${route}#${id}"]`)
            .classList.add('text-blue-600')
        } else {
          document
            .querySelector(`a[href="${route}#${id}"]`)
            .classList.remove('text-blue-600')
        }
      })
    })

    // Track all h2 that have an `id` applied
    document.querySelectorAll('h2[id]').forEach((tag) => {
      observer.observe(tag)
    })
  }, [route])

  return (
    <div className="flex flex-1" {...restProps}>
      <div className="flex justify-center flex-1 p-8 overflow-y-auto">
        <div className="prose" style={{ maxWidth: '100%' }}>
          {children}
        </div>
      </div>
      {/* Table of contents */}
      <div className="flex-none hidden w-64 px-6 py-8 space-y-4 text-sm xl:block">
        <p className="font-bold tracking-wider uppercase">on this page</p>
        <ul className="space-y-4">
          {headings.map((heading) => (
            <li key={heading.slug}>
              <Link className="cursor-pointer" to={`${route}#${heading.slug}`}>
                {heading.value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
