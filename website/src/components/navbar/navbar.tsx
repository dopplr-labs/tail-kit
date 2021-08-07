import React, { useState } from 'react'
import { HiExternalLink, HiMenu } from 'react-icons/hi'
import { Button, Drawer } from '@tail-kit/tail-kit'
import Sidebar from 'components/sidebar'
import { useDeviceSizeContext } from 'hooks/use-device-size'

export default function Navbar() {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const { deviceSize } = useDeviceSizeContext()
  const isMobile = deviceSize === 'sm' || deviceSize === 'md'

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-40 flex items-center w-full px-2 py-2.5 space-x-2 bg-white bg-opacity-50 border-b lg:px-3 lg:space-x-4 backdrop-filter backdrop-blur-md"
    >
      {isMobile ? (
        <>
          <Button
            buttonType="link"
            icon={<HiMenu />}
            className="!text-gray-500 lg:hidden"
            onClick={() => {
              setSideBarOpen(true)
            }}
          />
          <Drawer
            visible={sideBarOpen}
            onRequestClose={() => {
              setSideBarOpen(false)
            }}
            closable
            title={
              <img src="brand-image.png" className="w-24" alt="tail-kit logo" />
            }
            placement="left"
          >
            <Sidebar />
          </Drawer>
        </>
      ) : null}
      <img
        src="brand-image.png"
        className="hidden lg:block lg:w-24"
        alt="tail-kit logo"
      />
      <div className="flex-1" />
      <a
        href="https://github.com/dopplr-labs/tail-kit"
        target="_blank"
        rel="noopenner noreferrer"
        className="flex items-center text-sm font-medium focus:outline-none group"
      >
        <span className="mr-1 text-gray-700 group-hover:text-gray-800">
          Github
        </span>
        <HiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-700" />
      </a>
    </nav>
  )
}
