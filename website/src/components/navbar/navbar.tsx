import React from 'react'
import { HiExternalLink } from 'react-icons/hi'

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-40 flex items-center w-full bg-white bg-opacity-50 border-b backdrop-filter backdrop-blur-md"
    >
      <div className="flex-shrink-0 px-6 py-3">
        <img src="brand-image.png" className="w-24" alt="tail-kit logo" />
      </div>
      <div className="flex justify-between flex-auto px-6 py-3">
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
      </div>
    </nav>
  )
}
