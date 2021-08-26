import React from 'react'
import Navbar from 'components/navbar'
import Sidebar from 'components/sidebar'

type DocShellProps = {
  children: React.ReactNode
}

export default function DocShell({ children }: DocShellProps) {
  return (
    <>
      <Navbar />
      <div className="relative flex items-start h-screen pt-14">
        <Sidebar className="fixed bottom-0 h-[calc(100vh-56px)] left-0 hidden w-64 p-4 border-r lg:block overflow-auto" />
        <div id="content-wrapper" className="pl-0 lg:pl-[256px]">
          <div className="px-4 py-4 mx-auto max-w-7xl lg:px-4 lg:py-8">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
