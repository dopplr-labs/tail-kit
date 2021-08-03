import React from 'react'
import clsx from 'clsx'
import data from 'configs/docs-sidebar.json'
import { useRouter } from 'next/router'

const routes = data.routes

type SidebarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Sidebar({ className, style }: SidebarProps) {
  const { query } = useRouter()
  const { id: currentPath } = query as { id?: string }

  return (
    <div id="sidebar" className={clsx(className)} style={style}>
      <ul className="space-y-4 text-sm lg:text-sm">
        {routes.map((route) => (
          <li key={route.title}>
            <h4 className="mb-3 font-semibold tracking-wide text-gray-800 uppercase">
              {route.title}
            </h4>
            <ul className="space-y-1">
              {route.routes.map((route) => (
                <li key={route.title}>
                  <a
                    href={route.path}
                    className={clsx(
                      'font-medium px-4 py-2 block rounded-md',
                      route.path === `/${currentPath}`
                        ? 'text-blue-500 bg-blue-50'
                        : 'text-gray-600 hover:bg-gray-50',
                    )}
                  >
                    {route.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
