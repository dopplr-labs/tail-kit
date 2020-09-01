import React, {
  useState,
  cloneElement,
  useRef,
  createContext,
  useContext,
  useLayoutEffect,
} from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import { useMemoOne } from 'use-memo-one'
import {
  getMenuPlacement,
  getMenuPosition,
  VerticalPlacement,
  HorizontalPlacement,
  getTransformOriginClassName,
  getMenuVerticalPlacement,
  getMenuHorizontalPlacement,
} from './utils'

enum MenuVisibility {
  HIDDEN = 'HIDDEN',
  INVISIBLE = 'INVISIBLE',
  SHOWN = 'SHOWN',
}

const MenuContext = createContext<{
  menuVisible: MenuVisibility
  setMenuVisible: React.Dispatch<React.SetStateAction<MenuVisibility>>
}>({
  menuVisible: MenuVisibility.HIDDEN,
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
  /** vertical placement of the menu item, it could be either
   * `VerticalPlacement.TOP` (render the menu at top of the trigger)
   * or `VerticalPlacement.BOTTOM` (render menu at bottom) */
  verticalPlacement?: VerticalPlacement
  /** horizontal placement of the menu item, it could be either
   * `HorizontalPlacement.LEFT` (the left position of menu and trigger co-incide)
   * or `HorizontalPlacement.RIGHT` (the right position of the menu and trigger co-incide) */
  horizontalPlacement?: HorizontalPlacement
}

/**
 * Component to render **dropdown menu**.
 *
 * Use `Menu.MenuItem` and `Menu.Divider` components to render the drop down content
 *
 * If `verticalPlacement` or `horizontalPlacement` is not provided, it would be computed based on the position of
 * trigger and menu content.
 */
export function Menu({
  trigger,
  children,
  portalParent = document.body,
  verticalPlacement,
  horizontalPlacement,
}: MenuProps) {
  const portalContainer = useMemoOne(() => {
    const container = document.createElement('div')
    container.classList.add('menu-portal-container')
    return container
  }, [])

  /**
   * Before showing the menu, we need to find the size of the width component
   * to compute the placement automatically.
   *
   * To do this
   * 1. First render the menu with visiblity: hidden (https://codesandbox.io/s/goofy-torvalds-15wuc?file=/src/App.tsx to see why used visiblity hidden instead of display none)
   * 2. Get the menu content BCR and trigger BCR
   * 3. Compute the placement depending on trigger BCR and content BCR
   * 4. Set the placement and render the menu content
   *
   * State
   * menuVisiblity = 'HIDDEN' | 'INVISIBLE' | 'SHOWN'
   * HIDDEN -> won't render the menu
   * INVISIBLE -> render menu with visiblity: hidden
   * SHOWN -> render menu at correct position
   */

  const [menuVisible, setMenuVisible] = useState<MenuVisibility>(
    MenuVisibility.HIDDEN,
  )

  const triggerContainer = useRef<HTMLDivElement | null>(null)

  const menuContainer = useRef<HTMLDivElement | null>(null)

  const [menuContainerPosition, setMenuContainerPosition] = useState<
    | {
        top: number
        left: number
        placement: [VerticalPlacement, HorizontalPlacement]
      }
    | undefined
  >(undefined)

  useLayoutEffect(() => {
    if (menuVisible === MenuVisibility.INVISIBLE) {
      const menuContainerBCR = menuContainer.current?.getBoundingClientRect()
      const triggerBCR = triggerContainer.current?.getBoundingClientRect()
      if (menuContainerBCR && triggerBCR) {
        const placement = [
          verticalPlacement ??
            getMenuVerticalPlacement(triggerBCR, menuContainerBCR),
          horizontalPlacement ??
            getMenuHorizontalPlacement(triggerBCR, menuContainerBCR),
        ] as [VerticalPlacement, HorizontalPlacement]
        const { top, left } = getMenuPosition(
          triggerBCR,
          menuContainerBCR,
          placement,
        )
        setMenuVisible(MenuVisibility.SHOWN)
        setMenuContainerPosition({
          top:
            top +
            // take scrollY position into consideration as the BCR is with respect to viewport
            window.scrollY,
          left:
            left +
            // take scrollX position into consideration as the BCR is with respecdt to viewport
            window.scrollX,
          placement,
        })
      }
    }
  }, [menuVisible, trigger, verticalPlacement, horizontalPlacement])

  /**
   * menu overlay is used to capture any click outside the menu, so as to close it
   * it is a transparent background covering the entire screen
   *
   * it simplies the outside click behaviour as for menu item we don't have to worry about
   * the order of menu creation, each newly created menu item's overlay would be on the top of
   * the previous
   *
   * it would be easier to implement sub menu as well as menu within modal
   */
  const overlay = menuVisible ? (
    <div
      className="fixed inset-0 z-10"
      onClick={(event) => {
        event.stopPropagation()
        if (!menuContainer.current?.contains(event.target as Node)) {
          setMenuVisible(MenuVisibility.HIDDEN)
        }
      }}
    />
  ) : null

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
            setMenuVisible(
              (prevState) =>
                prevState === MenuVisibility.SHOWN
                  ? MenuVisibility.HIDDEN
                  : MenuVisibility.INVISIBLE, // instead of directly showing the menu, render it as invisible (see above for the description)
            )
          },
        })}
      </div>
      {menuVisible === MenuVisibility.INVISIBLE ? (
        <div
          className="fixed top-0 left-0 inline-block"
          style={{ visibility: 'hidden' }}
        >
          {menuContent}
        </div>
      ) : null}
      {createPortal(
        <>
          {overlay}
          <CSSTransition
            in={menuVisible === MenuVisibility.SHOWN && !!menuContainerPosition}
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
              className={clsx(
                'absolute z-20',
                getTransformOriginClassName(menuContainerPosition?.placement),
              )}
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

Menu.VerticalPlacement = VerticalPlacement
Menu.HorizontalPlacement = HorizontalPlacement
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
        event.stopPropagation()
        onClick?.(event)
        setMenuVisible(MenuVisibility.HIDDEN)
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
