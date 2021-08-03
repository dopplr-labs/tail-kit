import React from 'react'
import Navbar from 'components/navbar'
import Sidebar from 'components/sidebar'

type DocShellProps = {
  children: React.ReactNode
}

export default function DocShell({ children }: DocShellProps) {
  return (
    <div className="flex flex-col w-full h-screen mx-auto">
      <Navbar />
      <div className="flex h-full overflow-hidden pt-14">
        <Sidebar className="hidden w-64 h-full p-4 overflow-auto border-r lg:block" />
        <div id="content-wrapper" className="flex-1 h-full overflow-y-auto">
          <div className="max-w-6xl px-4 py-4 mx-auto lg:px-4 lg:py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
