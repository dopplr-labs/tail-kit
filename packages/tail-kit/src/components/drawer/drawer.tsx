import React, { useEffect, useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import { HiOutlineX } from 'react-icons/hi'
import useOutsideClick from 'hooks/use-outside-click'
import isNumber from 'utils/isNumber'

export enum DrawerPlacement {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

/**
 * Drawer component properties
 */
export type DrawerProps = {
  /** content rendered inside the modal */
  children: React.ReactNode
  /** Whether a close (x) button is visible on top right of the Drawer dialog or not */
  closable?: boolean
  /** The footer for Drawer */
  footer?: React.ReactNode
  /** function called when the user is closing the drawer, either by clicking on cancel button or overlay */
  onRequestClose?: () => void
  /** title of the drawer */
  title?: string
  /** The placement of the Drawer */
  placement?: DrawerPlacement
  /** parent of the portal container */
  portalParent?: HTMLElement
  /** Define the size of drawer (width in case of left or right placement and height in case of top or bottom placement) */
  size?: number
  /** whether drawer is visible or not */
  visible: boolean
  /** Additional classes applied to the Drawer component */
  className?: string
  /** Additional styles applied to the Drawer component */
  style?: React.CSSProperties
}

/**
 *  A panel which slides in from the edge of the screen.
 *
 * ### When To Use
 *
 * A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since the user can interact with the Drawer without leaving the current page, tasks can be achieved more efficiently within the same context.
 *
 * * Use a Form to create or edit a set of information.
 * * Processing subtasks. When subtasks are too heavy for a Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
 * * When the same Form is needed in multiple places.
 */

export function Drawer({
  children,
  closable = false,
  footer,
  onRequestClose,
  placement = DrawerPlacement.right,
  portalParent = document.body,
  size = 256,
  title = '',
  visible,
  className,
  style,
}: DrawerProps) {
  const portalContainer = useMemoOne(() => {
    const container = document.createElement('div')
    container.classList.add('drawer-portal-container')
    return container
  }, [])

  const contentContainer = useRef<HTMLDivElement | null>(null)

  useOutsideClick({
    containers: useMemoOne(() => [contentContainer], []),
    active: visible ?? false,
    onClick: () => {
      onRequestClose?.()
    },
  })

  useEffect(() => {
    portalParent.appendChild(portalContainer)

    return () => {
      portalParent.removeChild(portalContainer)
    }
  }, [portalContainer, portalParent])

  let placementClasses
  if (placement === DrawerPlacement.right) {
    placementClasses = 'top-0 right-0'
  } else if (placement === DrawerPlacement.left) {
    placementClasses = 'top-0 left-0'
  } else if (placement === DrawerPlacement.top) {
    placementClasses = 'top-0 left-0'
  } else if (placement === DrawerPlacement.bottom) {
    placementClasses = 'bottom-0 left-0'
  }

  let height: string | undefined
  let width: string | undefined
  if (
    placement === DrawerPlacement.right ||
    placement === DrawerPlacement.left
  ) {
    height = '100%'
    width = isNumber(size) ? `${size}px` : '256px'
  } else if (
    placement === DrawerPlacement.top ||
    placement === DrawerPlacement.bottom
  ) {
    height = isNumber(size) ? `${size}px` : '256px'
    width = '100%'
  }

  return createPortal(
    <>
      <div
        className={clsx(
          'fixed inset-0 flex w-full h-full transition-opacity duration-200 bg-black',
          visible
            ? 'opacity-50 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
        data-testid="drawer-overlay"
      />
      <CSSTransition
        in={visible}
        timeout={200}
        classNames={`drawer-${placement}`}
        unmountOnExit
      >
        <div
          className={clsx(
            'bg-white shadow-2xl fixed flex flex-col justify-between drawer',
            placementClasses,
            className,
          )}
          style={{ ...style, width, height }}
          ref={contentContainer}
        >
          {closable ? (
            <button
              className="absolute top-0 right-0 p-1 mt-3 mr-3 rounded-md focus:outline-none focus:ring-2"
              onClick={onRequestClose}
            >
              <HiOutlineX className="w-4 h-4" />
            </button>
          ) : null}

          <div>
            {title ? (
              <div className="px-6 py-3 font-medium text-gray-900 border-b">
                {title}
              </div>
            ) : null}
            <div className="p-6 overflow-auto text-sm text-gray-700 scrollable">
              {children}
            </div>
          </div>

          {footer ? <div className="px-4 py-3 border-t">{footer}</div> : null}
        </div>
      </CSSTransition>
    </>,
    portalContainer,
  )
}

Drawer.DrawerPlacement = DrawerPlacement
