import React from 'react'
import Navbar from 'components/navbar'
import Sidebar from 'components/sidebar'
import { useRouter } from 'next/dist/client/router'

type DocShellProps = {
  children: React.ReactNode
}

export default function DocShell({ children }: DocShellProps) {
  const { query } = useRouter()
  const { id: currentPath } = query as { id?: string }

  return (
    <div className="flex flex-col w-full h-screen mx-auto">
      <Navbar />
      <div className="flex h-full overflow-hidden pt-14">
        <Sidebar currentPath={currentPath} />
        <div id="content-wrapper" className="flex-1 h-full overflow-y-auto">
          <div className="flex items-start max-w-6xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}
