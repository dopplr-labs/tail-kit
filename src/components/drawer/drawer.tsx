import React, { useEffect, useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import { createPortal } from 'react-dom'
import { isNumber } from 'lodash-es'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import useOutsideClick from 'hooks/use-outside-click'
import { XOutline } from 'components/icons'

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

export function Drawer({
  children,
  closable = false,
  footer,
  onRequestClose,
  placement = DrawerPlacement.right,
  portalParent = document.body,
  size = 250,
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

  let height: string, width: string
  if (
    placement === DrawerPlacement.right ||
    placement === DrawerPlacement.left
  ) {
    height = '100%'
    width = isNumber(size) ? `${size}px` : '250px'
  } else if (
    placement === DrawerPlacement.top ||
    placement === DrawerPlacement.bottom
  ) {
    height = isNumber(size) ? `${size}px` : '250px'
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
          style={{ width, height, ...style }}
          ref={contentContainer}
        >
          {closable ? (
            <button
              className="absolute top-0 right-0 p-1 mt-3 mr-3 rounded-md focus:outline-none focus:shadow-outline"
              onClick={onRequestClose}
            >
              <XOutline className="w-4 h-4" />
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
