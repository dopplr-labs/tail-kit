import React, { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import clsx from 'clsx'
import { NavLink } from '../NavLink'

export const NavGroup = ({ item }) => {
  const { menu } = item
  const [subheadingsVisible, setShowsubheadings] = useState(true)
  const toggleSubheadings = () => setShowsubheadings(!subheadingsVisible)

  return (
    <div className="my-4" data-testid="nav-group">
      <button
        onClick={toggleSubheadings}
        className="flex items-center justify-between w-full text-base font-semibold tracking-widest uppercase"
      >
        <span>{item.name}</span>
        <HiChevronDown
          className={clsx(
            'w-5 h-5 transform transition',
            subheadingsVisible ? 'rotate-180' : '',
          )}
        />
      </button>
      <div className="ml-2" data-testid="nav-group-links">
        {menu &&
          subheadingsVisible &&
          menu.map((menu) => (
            <NavLink key={menu.id} item={menu}>
              {menu.name}
            </NavLink>
          ))}
      </div>
    </div>
  )
}
