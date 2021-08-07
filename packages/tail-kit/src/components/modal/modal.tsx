import React, { useLayoutEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'
import { useMemoOne } from 'use-memo-one'
import Button from 'components/button'
import { ButtonProps } from 'components/button/button'

import useOutsideClick from 'hooks/use-outside-click'

type ActionButtonProps = Omit<ButtonProps, 'onClick'> & {
  ref?: React.Ref<HTMLButtonElement>
}

/**
 * Modal properties
 */
export type ModalProps = {
  /** title of the modal */
  title?: React.ReactNode
  /** content rendered inside the modal */
  children: React.ReactNode
  /** function called on "OK" button click */
  onOK?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** function called on "Cancel" button click */
  onCancel?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** additional props passed to OK button excluding `onClick` */
  okButtonProps?: ActionButtonProps
  /** additional props passed to Cancel button excluding `onClick` */
  cancelButtonProps?: ActionButtonProps
  /** whether modal is visible or not */
  visible?: boolean
  /** function called when the user is closing the modal, either by clicking on cancel button or overlay */
  onRequestClose?: () => void
  /** custom actions button instead of OK and Cancel */
  actions?: React.ReactNode
  /** Show dividers on top and bottom of Modal children  */
  dividers?: boolean
  /** Change maxWidth of modal using breakpoints */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** parent of the portal container */
  portalParent?: HTMLElement
}

export function Modal({
  title,
  children,
  onOK,
  onCancel,
  okButtonProps,
  cancelButtonProps,
  visible,
  onRequestClose,
  actions,
  dividers = false,
  maxWidth = 'sm',
  portalParent = typeof window !== 'undefined' ? document.body : undefined,
}: ModalProps) {
  const portalContainer = useMemoOne(() => {
    const container =
      typeof window !== 'undefined' ? document.createElement('div') : undefined
    container?.classList.add('modal-portal-container')
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

  useLayoutEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [visible])

  const modalTitle = useMemo(() => {
    if (!title) {
      return null
    }
    if (typeof title === 'string') {
      return (
        <div className="px-4 py-3 text-lg font-semibold text-gray-900">
          {title}
        </div>
      )
    }
    return title
  }, [title])

  if (!portalContainer) {
    return null
  }

  return createPortal(
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="modal"
      unmountOnExit
      onEnter={() => {
        if (portalContainer && !portalParent?.contains(portalContainer)) {
          portalParent?.appendChild(portalContainer)
        }
      }}
      onExited={() => {
        if (portalContainer && portalParent?.contains(portalContainer)) {
          portalParent?.removeChild(portalContainer)
        }
      }}
    >
      <div
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75 modal-overlay"
        data-testid="modal-overlay"
      >
        <div
          className={`flex flex-col w-full max-w-screen-${maxWidth} max-h-full overflow-hidden bg-white rounded-md shadow-2xl`}
          ref={contentContainer}
        >
          {modalTitle}
          <div
            className={clsx(
              'flex-1 px-4 overflow-auto text-sm text-gray-700 scrollable',
              dividers ? 'border-t border-b py-4' : 'py-2',
            )}
          >
            {children}
          </div>
          <div className="flex items-center justify-end px-4 py-3 space-x-4">
            {actions ?? (
              <>
                <Button
                  buttonType="default"
                  onClick={onCancel ?? onRequestClose}
                  tabIndex={visible ? 0 : -1}
                  {...cancelButtonProps}
                >
                  {cancelButtonProps?.children ?? 'Cancel'}
                </Button>
                <Button
                  buttonType="primary"
                  onClick={onOK ?? onRequestClose}
                  tabIndex={visible ? 0 : -1}
                  {...okButtonProps}
                >
                  {okButtonProps?.children ?? 'OK'}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>,
    portalContainer,
  )
}
