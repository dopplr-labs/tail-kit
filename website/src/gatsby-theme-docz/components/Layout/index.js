import React, { useRef } from 'react'
import { MainContainer } from '../MainContainer'
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'

export const Layout = ({ children }) => {
  const nav = useRef()
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar ref={nav} />
        <MainContainer data-testid="main-container">{children}</MainContainer>
      </div>
    </div>
  )
}
