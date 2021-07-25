import React, { useEffect, useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'

export const Header = () => {
  const [stars, setStars] = useState(0)

  useEffect(() => {
    fetch('https://api.github.com/repos/dopplr-labs/tail-kit')
      .then((res) => res.json())
      .then((data) => data.stargazers_count)
      .then(setStars)
  }, [])

  return (
    <nav className="flex items-center px-6 py-2 bg-white border-b border-gray-300">
      <img
        src="https://tail-kit.netlify.app/static/media/brand-image.81b4703b.png"
        alt="tail-kit logo"
        className="w-32"
      />
      <div className="flex-1" />
      <a
        href="https://github.com/dopplr-labs/tail-kit"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-2 text-gray-500 hover:text-black"
      >
        <AiFillGithub className="w-6 h-6" />
      </a>
      <div className="relative px-2 text-sm text-gray-500 border border-gray-500 rounded">
        <div className="absolute left-0 inline-block w-2 h-2 transform rotate-45 -translate-x-1/2 -translate-y-1/2 bg-white border-b border-l border-gray-500 top-1/2"></div>
        {stars}
      </div>
    </nav>
  )
}
