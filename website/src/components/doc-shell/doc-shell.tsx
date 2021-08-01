import React from 'react'
import Navbar from 'components/navbar'
import Sidebar from 'components/sidebar'

type DocShellProps = {
  children: React.ReactNode
  currentPath: string
}

export default function DocShell({ children, currentPath }: DocShellProps) {
  return (
    <div className="flex flex-col w-full h-screen mx-auto max-w-8xl ">
      <Navbar />
      <div className="flex h-full overflow-hidden">
        <Sidebar currentPath={currentPath} />
        <div id="content-wrapper" className="flex h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
