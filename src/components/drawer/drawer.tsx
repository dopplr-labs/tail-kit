import React, { useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import useOutsideClick from 'hooks/use-outside-click'
import { XOutline } from 'components/icons'

export type DrawerProps = {
  /** content rendered inside the modal */
  children: React.ReactNode
  /** Whether a close (x) button is visible on top right of the Drawer dialog or not */
  closable?: boolean
  footer?: React.ReactNode
  /** function called when the user is closing the drawer, either by clicking on cancel button or overlay */
  onRequestClose?: () => void
  /** title of the drawer */
  title?: string
  /** The placement of the Drawer */
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /** parent of the portal container */
  portalParent?: HTMLElement
  /** whether drawer is visible or not */
  visible: boolean
  className?: string
  style?: React.CSSProperties
}

export function Drawer({
  children,
  closable = false,
  footer,
  onRequestClose,
  placement = 'right',
  portalParent = document.body,
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

  return createPortal(
    <>
      <div
        className={clsx(
          'fixed inset-0 flex w-full h-full transition-opacity duration-500 bg-black',
          visible ? 'bg-opacity-50' : 'bg-opacity-0',
        )}
      />
      <CSSTransition
        in={visible}
        timeout={300}
        classNames={`drawer-${placement}`}
        unmountOnExit
        onEnter={() => {
          if (!portalParent.contains(portalContainer)) {
            portalParent.appendChild(portalContainer)
          }
        }}
        onExited={() => {
          if (portalParent.contains(portalContainer)) {
            portalParent.removeChild(portalContainer)
          }
        }}
      >
        <div
          className={clsx(
            'bg-white shadow-2xl fixed flex flex-col justify-between',
            placement === 'right'
              ? 'top-0 right-0 w-64 h-full'
              : placement === 'left'
              ? 'top-0 left-0 w-64 h-full'
              : placement === 'top'
              ? 'top-0 left-0 w-full h-64'
              : 'bottom-0 left-0 w-full h-64',
            className,
          )}
          style={style}
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
