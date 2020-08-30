import React, {
  useState,
  cloneElement,
  useRef,
  createContext,
  useContext,
  useLayoutEffect,
} from 'react'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import { useMemoOne } from 'use-memo-one'
import { createPortal } from 'react-dom'

const MenuContext = createContext<{
  menuVisible: boolean
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
}>({
  menuVisible: false,
  setMenuVisible: () => {},
})

/**
 * Menu properties
 */
export type MenuProps = {
  /** trigger component to open menu */
  trigger: JSX.Element
  /** menu content, can contain both items and dividers */
  children: React.ReactNode
  /** parent of the portal container rendering the menu */
  portalParent?: HTMLElement
}

export function Menu({
  trigger,
  children,
  portalParent = document.body,
}: MenuProps) {
  const portalContainer = useMemoOne(() => {
    const container = document.createElement('div')
    container.classList.add('menu-portal-container')
    return container
  }, [])

  const [menuVisible, setMenuVisible] = useState(false)

  const triggerContainer = useRef<HTMLDivElement | null>(null)

  const menuContainer = useRef<HTMLDivElement | null>(null)

  const [menuContainerPosition, setMenuContainerPosition] = useState<
    | {
        top: number
        left: number
      }
    | undefined
  >(undefined)
  useLayoutEffect(() => {
    if (menuVisible) {
      if (triggerContainer.current) {
        const triggerBCR = triggerContainer.current.getBoundingClientRect()
        setMenuContainerPosition({
          top:
            triggerBCR.top +
            triggerBCR.height +
            // take scrollY position into consideration as the BCR is with respect to viewport
            window.scrollY +
            // gap between the trigger and menu container
            12,
          left:
            triggerBCR.left +
            // take scrollX position into consideration as the BCR is with respecdt to viewport
            window.scrollX,
        })
      }
    }
  }, [menuVisible])

  const menuContent = (
    <div className="py-2 bg-white rounded-md shadow" ref={menuContainer}>
      <MenuContext.Provider value={{ menuVisible, setMenuVisible }}>
        {children}
      </MenuContext.Provider>
    </div>
  )

  return (
    <>
      <div className="inline-block" ref={triggerContainer}>
        {cloneElement(trigger, {
          onClick: () => {
            setMenuVisible((prevState) => !prevState)
          },
        })}
      </div>
      {createPortal(
        <>
          {menuVisible ? (
            <div
              className="fixed inset-0 z-10"
              onClick={(event) => {
                event.stopPropagation()
                if (!menuContainer.current?.contains(event.target as Node)) {
                  setMenuVisible(false)
                }
              }}
            />
          ) : null}
          <CSSTransition
            in={menuVisible && !!menuContainerPosition}
            timeout={200}
            classNames="menu"
            unmountOnExit
            onEnter={() => {
              portalParent.appendChild(portalContainer)
            }}
            onExited={() => {
              portalParent.removeChild(portalContainer)
              setMenuContainerPosition(undefined)
            }}
          >
            <div
              className="absolute z-20 origin-top-left"
              style={{
                top: menuContainerPosition?.top ?? 0,
                left: menuContainerPosition?.left ?? 0,
              }}
            >
              {menuContent}
            </div>
          </CSSTransition>
        </>,
        portalContainer,
      )}
    </>
  )
}

Menu.MenuItem = MenuItem
Menu.MenuDivider = MenuDivider

/** Menu item properties */
export type MenuItemProps = {
  /** menu item text */
  label: string
  /** menu item icon */
  icon?: JSX.Element
  /** function to be called on menu item click */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** additional class */
  className?: string
  /** additional styles */
  style?: React.CSSProperties
}

export function MenuItem({
  label,
  icon,
  onClick,
  className,
  style,
}: MenuItemProps) {
  const { setMenuVisible } = useContext(MenuContext)

  return (
    <button
      className={clsx(
        'flex w-full px-4 py-2 space-x-4 text-gray-500 transition-colors duration-300 focus:outline-none focus:shadow-outline hover:bg-gray-50 hover:shadow-inner',
        className,
      )}
      style={style}
      onClick={(event) => {
        onClick?.(event)
        setMenuVisible(false)
      }}
    >
      {icon ? cloneElement(icon, { className: 'w-5 h-5' }) : null}
      <span className="text-sm whitespace-no-wrap">{label}</span>
    </button>
  )
}

/** Menu divider properties */
export type MenuDividerProps = {
  /** additional classes for divider */
  className?: string
  /** additional styles */
  style?: React.CSSProperties
}

export function MenuDivider({ className, style }: MenuDividerProps) {
  return (
    <div
      className={clsx('border my-1 border-gray-100', className)}
      style={style}
    />
  )
}
