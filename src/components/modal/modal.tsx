import React, { useRef, useLayoutEffect } from 'react'
import Button, { Props as ButtonProps } from 'components/button'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

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
  // TODO: Replace useRef -> useMemoOne
  const portalContainer = useRef(document.createElement('div')).current
  useLayoutEffect(() => {
    portalContainer.classList.add('modal-portal-container')
    portalParent.appendChild(portalContainer)
    return () => {
      portalParent.removeChild(portalContainer)
    }
  }, [portalContainer, portalParent])

  const contentContainer = useRef<HTMLDivElement | null>(null)

  return createPortal(
    <div
      className={clsx(
        'modal-overlay fixed inset-0 bg-opacity-75 bg-black p-4 flex items-center justify-center transition-all duration-300',
        visible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none',
      )}
      onClick={(event) => {
        if (!contentContainer.current?.contains(event.target as HTMLElement)) {
          onRequestClose?.()
        }
      }}
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
    </div>,
    portalContainer,
  )
}
