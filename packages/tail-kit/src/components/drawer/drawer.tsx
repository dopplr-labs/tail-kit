import React, { useEffect, useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import { HiOutlineX } from 'react-icons/hi'
import isNumber from '../../utils/isNumber'
import useOutsideClick from '../../hooks/use-outside-click'
import Button from '../button'

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
  title?: React.ReactNode
  /** The placement of the Drawer */
  placement?: 'left' | 'right' | 'top' | 'bottom'
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
  placement = 'right',
  portalParent = typeof window !== 'undefined' ? document.body : undefined,
  size = 256,
  title = '',
  visible,
  className,
  style,
}: DrawerProps) {
  const portalContainer = useMemoOne(() => {
    const container =
      typeof window !== 'undefined' ? document.createElement('div') : undefined
    container?.classList.add('drawer-portal-container')
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
    if (portalContainer) {
      portalParent?.appendChild(portalContainer)
    }

    return () => {
      if (portalContainer) {
        portalParent?.removeChild(portalContainer)
      }
    }
  }, [portalContainer, portalParent])

  let placementClasses
  if (placement === 'right') {
    placementClasses = 'top-0 right-0'
  } else if (placement === 'left') {
    placementClasses = 'top-0 left-0'
  } else if (placement === 'top') {
    placementClasses = 'top-0 left-0'
  } else if (placement === 'bottom') {
    placementClasses = 'bottom-0 left-0'
  }

  let height: string | undefined
  let width: string | undefined
  if (placement === 'right' || placement === 'left') {
    height = '100%'
    width = isNumber(size) ? `${size}px` : '256px'
  } else if (placement === 'top' || placement === 'bottom') {
    height = isNumber(size) ? `${size}px` : '256px'
    width = '100%'
  }

  if (!portalContainer) {
    return null
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
          {title || closable ? (
            <div className="relative flex items-center py-2 pl-4 pr-3 font-medium text-gray-900 border-b min-h-[56px]">
              <div className="flex-1 truncate">{title}</div>
              {closable ? (
                <Button
                  buttonType="link"
                  icon={<HiOutlineX />}
                  onClick={onRequestClose}
                />
              ) : null}
            </div>
          ) : null}
          <div className="flex-1 overflow-auto text-sm text-gray-700 scrollable">
            <div className="p-4 lg:p-6">{children}</div>
          </div>

          {footer ? <div className="px-4 py-3 border-t">{footer}</div> : null}
        </div>
      </CSSTransition>
    </>,
    portalContainer,
  )
}
