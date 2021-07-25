import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { Input } from '@tail-kit/tail-kit'
import { useMenus } from 'docz'
import { NavLink } from '../NavLink'
import { NavGroup } from 'gatsby-theme-docz/src/components/NavGroup'

export const Sidebar = forwardRef(function Sidebar(props, ref) {
  const [query, setQuery] = useState('')
  const menus = useMenus({ query })
  const currentDocRef = useRef()
  const handleChange = (ev) => {
    setQuery(ev.target.value)
  }
  useEffect(() => {
    if (ref.current && currentDocRef.current) {
      ref.current.scrollTo(0, currentDocRef.current.offsetTop)
    }
  }, [ref])

  return (
    <div
      className="flex-none w-64 h-full p-6 overflow-y-auto border-r border-gray-300"
      data-testid="sidebar"
      ref={ref}
    >
      <Input
        placeholder="Find Components"
        icon={<HiOutlineSearch />}
        value={query}
        onChange={handleChange}
      />

      {menus &&
        menus.map((menu) => {
          if (!menu.route) {
            return <NavGroup key={menu.id} item={menu} />
          }
          return (
            <NavLink key={menu.id} item={menu}>
              {menu.name}
            </NavLink>
          )
        })}
    </div>
  )
})
