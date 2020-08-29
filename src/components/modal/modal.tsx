import React, { useRef, useCallback } from 'react'
import { useMemoOne } from 'use-memo-one'
import Button, { Props as ButtonProps } from 'components/button'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

type ActionButtonProps = Omit<ButtonProps, 'onClick'>

type Props = {
  title?: string
  children: React.ReactNode
  onOK?: (event: React.MouseEvent<HTMLButtonElement>) => void
  onCancel?: (event: React.MouseEvent<HTMLButtonElement>) => void
  okButtonProps?: ActionButtonProps
  cancelButtonProps?: ActionButtonProps
  visible?: boolean
  onRequestClose?: () => void
  actions?: React.ReactNode
  portalParent?: HTMLElement
}

export default function Modal({
  title = '',
  children,
  onOK,
  onCancel,
  okButtonProps,
  cancelButtonProps,
  visible,
  onRequestClose,
  actions,
  portalParent = document.body,
}: Props) {
  const portalContainer = useMemoOne(() => {
    const container = document.createElement('div')
    container.classList.add('modal-portal-container')
    return container
  }, [])

  const contentContainer = useRef<HTMLDivElement | null>(null)

  const handleOverlayClick = useCallback(
    (event) => {
      event.stopPropagation()
      if (!contentContainer.current?.contains(event.target as HTMLElement)) {
        onRequestClose?.()
      }
    },
    [onRequestClose],
  )

  return createPortal(
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="modal"
      unmountOnExit
      onEnter={() => {
        portalParent.appendChild(portalContainer)
      }}
      onExited={() => {
        portalParent.removeChild(portalContainer)
      }}
    >
      <div
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75 modal-overlay"
        onClick={handleOverlayClick}
      >
        <div
          className="flex flex-col w-full max-w-screen-sm max-h-full overflow-hidden bg-white rounded-md shadow-2xl modal-content-container"
          ref={contentContainer}
        >
          {title ? (
            <div className="px-4 py-3 text-lg font-semibold text-gray-900 border-b">
              {title}
            </div>
          ) : null}
          <div className="flex-1 p-4 overflow-auto text-sm text-gray-700 border-b modal-content-container">
            {children}
          </div>
          <div className="flex items-center justify-end px-4 py-3 space-x-4">
            {actions ?? (
              <>
                <Button
                  label="Cancel"
                  buttonType={Button.ButtonType.default}
                  onClick={onCancel ?? onRequestClose}
                  tabIndex={visible ? 0 : -1}
                  {...cancelButtonProps}
                />
                <Button
                  label="OK"
                  buttonType={Button.ButtonType.primary}
                  onClick={onOK ?? onRequestClose}
                  tabIndex={visible ? 0 : -1}
                  {...okButtonProps}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>,
    portalContainer,
  )
}
