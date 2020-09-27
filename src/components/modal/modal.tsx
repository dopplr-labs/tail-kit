import React, { useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import Button, { ButtonProps } from 'components/button'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import useOutsideClick from 'hooks/use-outside-click'

type ActionButtonProps = Omit<ButtonProps, 'onClick'> & {
  ref: React.Ref<HTMLButtonElement>
}

/**
 * Modal properties
 */
export type ModalProps = {
  /** title of the modal */
  title?: string
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
  /** parent of the portal container */
  portalParent?: HTMLElement
}

export function Modal({
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
}: ModalProps) {
  const portalContainer = useMemoOne(() => {
    const container = document.createElement('div')
    container.classList.add('modal-portal-container')
    return container
  }, [])

  const contentContainer = useRef<HTMLDivElement | null>(null)

  useOutsideClick({
    containers: [contentContainer],
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
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75 modal-overlay"
        data-testid="modal-overlay"
      >
        <div
          className="flex flex-col w-full max-w-screen-sm max-h-full overflow-hidden bg-white rounded-md shadow-2xl"
          ref={contentContainer}
        >
          {title ? (
            <div className="px-4 py-3 text-lg font-semibold text-gray-900 border-b">
              {title}
            </div>
          ) : null}
          <div className="flex-1 p-4 overflow-auto text-sm text-gray-700 border-b scrollable">
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
