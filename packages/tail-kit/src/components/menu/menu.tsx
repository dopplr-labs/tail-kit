import React, {
  useState,
  cloneElement,
  useRef,
  createContext,
  useContext,
} from 'react'
import clsx from 'clsx'
import Portal from 'components/portal'
import { useMemoOne } from 'use-memo-one'
import useOutsideClick from 'hooks/use-outside-click'

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
  /** vertical placement of the menu item, it could be either
   * `top` (render the menu at top of the trigger)
   * or `bottom` (render menu at bottom) */
  verticalPlacement?: 'top' | 'bottom'
  /** horizontal placement of the menu item, it could be either
   * `left` (the left position of menu and trigger co-incide)
   * or `right` (the right position of the menu and trigger co-incide) */
  horizontalPlacement?: 'left' | 'right'
}

/**
 * Component to render **dropdown menu**.
 *
 * Use `Menu.Item` and `Menu.Divider` components to render the drop down content
 *
 * If `verticalPlacement` or `horizontalPlacement` is not provided, it would be computed based on the position of
 * trigger and menu content.
 */
export function Menu({
  trigger,
  children,
  portalParent = typeof window !== 'undefined' ? document.body : undefined,
  verticalPlacement = 'bottom',
  horizontalPlacement = 'left',
}: MenuProps) {
  const [menuVisible, setMenuVisible] = useState(false)

  const triggerContainer = useRef<HTMLDivElement | null>(null)

  const menuContainer = useRef<HTMLDivElement | null>(null)

  // `leftAlign` and `rightAlign` are used to align the menu and trigger
  // `left` and `right` options are for tooltip to render content on left or right side of the trigger
  enum horizontalPlacementOptions {
    left = 'leftAlign',
    right = 'rightAlign',
  }

  const menuContent = (
    <div className="py-2 bg-white rounded-md shadow" ref={menuContainer}>
      <MenuContext.Provider value={{ menuVisible, setMenuVisible }}>
        {children}
      </MenuContext.Provider>
    </div>
  )

  useOutsideClick({
    containers: useMemoOne(() => [menuContainer, triggerContainer], []),
    active: menuVisible,
    onClick: () => {
      setMenuVisible(false)
    },
  })

  return (
    <>
      <div
        className="inline-block"
        ref={triggerContainer}
        onClick={() => {
          setMenuVisible((prevState) => !prevState)
        }}
      >
        {trigger}
      </div>
      <Portal
        triggerRef={triggerContainer}
        visible={menuVisible}
        portalParent={portalParent}
        defaultPlacement={[
          verticalPlacement,
          horizontalPlacementOptions[horizontalPlacement],
        ]}
        allowedPlacements={[
          ['bottom', 'leftAlign'],
          ['bottom', 'rightAlign'],
          ['top', 'leftAlign'],
          ['top', 'rightAlign'],
        ]}
      >
        {menuContent}
      </Portal>
    </>
  )
}

Menu.Item = MenuItem
Menu.Divider = MenuDivider

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
        'flex w-full px-4 py-2 space-x-4 text-gray-500 transition-colors duration-300 focus:outline-none hover:bg-gray-100',
        className,
      )}
      style={style}
      onClick={(event) => {
        event.stopPropagation()
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
