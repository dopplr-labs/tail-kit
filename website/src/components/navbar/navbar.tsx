import React from 'react'
import { FaGithub } from 'react-icons/fa'

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="sticky top-0 z-40 flex items-center flex-none w-full mx-auto bg-gray-100 bg-opacity-50 lg:z-50 max-w-8xl backdrop-filter backdrop-blur-md"
    >
      <div className="flex-shrink-0 px-6 py-3 xl:px-8 xl:w-72 lg:w-64">
        <img src="brand-image.png" className="w-24" />
      </div>
      <div className="flex justify-between flex-auto px-6 py-3">
        <div className="flex-1" />
        <a
          href="https://github.com/dopplr-labs/tail-kit"
          target="_blank"
          rel="noopenner noreferrer"
          className="focus:outline-none"
        >
          <FaGithub className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </a>
      </div>
    </nav>
  )
}
