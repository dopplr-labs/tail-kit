import React from 'react'
declare enum MenuVerticalPlacement {
  top = 'top',
  bottom = 'bottom',
}
declare enum MenuHorizontalPlacement {
  left = 'leftAlign',
  right = 'rightAlign',
}
/**
 * Menu properties
 */
export declare type MenuProps = {
  /** trigger component to open menu */
  trigger: JSX.Element
  /** menu content, can contain both items and dividers */
  children: React.ReactNode
  /** parent of the portal container rendering the menu */
  portalParent?: HTMLElement
  /** vertical placement of the menu item, it could be either
   * `VerticalPlacement.TOP` (render the menu at top of the trigger)
   * or `VerticalPlacement.BOTTOM` (render menu at bottom) */
  verticalPlacement?: MenuVerticalPlacement
  /** horizontal placement of the menu item, it could be either
   * `HorizontalPlacement.LEFT` (the left position of menu and trigger co-incide)
   * or `HorizontalPlacement.RIGHT` (the right position of the menu and trigger co-incide) */
  horizontalPlacement?: MenuHorizontalPlacement
}
/**
 * Component to render **dropdown menu**.
 *
 * Use `Menu.MenuItem` and `Menu.Divider` components to render the drop down content
 *
 * If `verticalPlacement` or `horizontalPlacement` is not provided, it would be computed based on the position of
 * trigger and menu content.
 */
export declare function Menu({
  trigger,
  children,
  portalParent,
  verticalPlacement,
  horizontalPlacement,
}: MenuProps): JSX.Element
export declare namespace Menu {
  var VerticalPlacement: typeof MenuVerticalPlacement
  var HorizontalPlacement: typeof MenuHorizontalPlacement
  var MenuItem: typeof import('./menu').MenuItem
  var MenuDivider: typeof import('./menu').MenuDivider
}
/** Menu item properties */
export declare type MenuItemProps = {
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
export declare function MenuItem({
  label,
  icon,
  onClick,
  className,
  style,
}: MenuItemProps): JSX.Element
/** Menu divider properties */
export declare type MenuDividerProps = {
  /** additional classes for divider */
  className?: string
  /** additional styles */
  style?: React.CSSProperties
}
export declare function MenuDivider({
  className,
  style,
}: MenuDividerProps): JSX.Element
export {}
