import React from 'react'
import { Link } from 'gatsby'

export const NavLink = ({ item, ...props }) => {
  if (item.hidden) {
    return null
  }

  const to = item.route
  return (
    <Link
      {...props}
      to={to}
      className="block py-1 text-base text-gray-500 cursor-pointer hover:text-gray-700"
      activeClassName="text-blue-600"
    />
  )
}
