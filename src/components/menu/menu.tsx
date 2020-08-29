import React, { useState, cloneElement, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

export type MenuItem = {
  label: string
  icon?: JSX.Element
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type Props = {
  children: JSX.Element
  items: MenuItem[]
}

export default function Menu({ children, items }: Props) {
  const [menuVisible, setMenuVisible] = useState(true)

  const menuContainer = useRef<HTMLDivElement | null>(null)

  return (
    <div className="relative inline-block">
      {cloneElement(children, {
        onClick: () => {
          setMenuVisible((prevState) => !prevState)
        },
      })}
      {menuVisible ? (
        <div
          className="fixed inset-0 z-10"
          onClick={(event) => {
            if (!menuContainer.current?.contains(event.target as Node)) {
              setMenuVisible(false)
            }
          }}
        />
      ) : null}
      <CSSTransition
        in={menuVisible}
        timeout={300}
        classNames="menu"
        unmountOnExit
      >
        <div
          className="absolute bottom-0 z-20 h-auto py-2 -mb-2 whitespace-no-wrap transform translate-y-full bg-white rounded-md shadow"
          ref={menuContainer}
        >
          {items.map((item) => (
            <button
              key={item.label}
              className="flex w-full px-4 py-2 space-x-4 text-gray-500 transition-colors duration-300 focus:outline-none focus:shadow-outline hover:bg-gray-50 hover:shadow-inner"
              onClick={() => {
                setMenuVisible(false)
              }}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </CSSTransition>
    </div>
  )
}
