import React, { useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import useOutsideClick from 'hooks/use-outside-click'

export type DrawerProps = {
  /** whether drawer is visible or not */
  visible: boolean
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /** function called when the user is closing the drawer, either by clicking on cancel button or overlay */
  onRequestClose?: () => void
  /** parent of the portal container */
  portalParent?: HTMLElement
}

export function Drawer({
  visible,
  placement = 'right',
  onRequestClose,
  portalParent = document.body,
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
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="modal"
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
          'fixed inset-0 flex justify-start w-full h-full bg-black bg-opacity-75',
          placement === 'right'
            ? 'justify-end'
            : placement === 'left'
            ? 'justify-start'
            : undefined,
        )}
      >
        <div className="w-64 h-full bg-white" ref={contentContainer} />
      </div>
    </CSSTransition>,
    portalContainer,
  )
}
