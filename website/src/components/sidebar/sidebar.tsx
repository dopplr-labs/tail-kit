import React from 'react'
import clsx from 'clsx'
import data from 'configs/docs-sidebar.json'

const routes = data.routes

type SidebarProps = {
  currentPath: string
}

export default function Sidebar({ currentPath }: SidebarProps) {
  return (
    <div
      id="sidebar"
      className="flex-none hidden w-64 p-4 overflow-y-auto border-r lg:block"
    >
      <ul className="space-y-4 text-base lg:text-sm">
        {routes.map((route) => (
          <li key={route.title}>
            <h4 className="mb-3 font-semibold tracking-wide text-gray-800 uppercase lg:text-xs">
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
