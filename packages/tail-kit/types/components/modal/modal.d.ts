import React from 'react'
import { ButtonProps } from 'components/button/button'
declare type ActionButtonProps = Omit<ButtonProps, 'onClick'> & {
  ref?: React.Ref<HTMLButtonElement>
}
/**
 * Modal properties
 */
export declare type ModalProps = {
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
export declare function Modal({
  title,
  children,
  onOK,
  onCancel,
  okButtonProps,
  cancelButtonProps,
  visible,
  onRequestClose,
  actions,
  portalParent,
}: ModalProps): React.ReactPortal
export {}
