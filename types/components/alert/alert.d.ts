import React from 'react'
export declare enum AlertType {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}
/**
 * Alert properties
 */
export declare type AlertProps = {
  /** Type of the alert which can be either `AlertType.error` or `AlertType.warning` or `AlertType.success` or `AlertType.info` */
  type?: AlertType
  /** Alert title */
  title: React.ReactNode
  /** Alert content */
  content?: React.ReactNode
  /** Alert icon */
  icon?: JSX.Element | boolean
  /** Alert action buttons */
  actions?: JSX.Element
  /** Making alert closable. It would render (X) button */
  closable?: boolean
  /** Function to be called on pressing the (X) button */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /** Add className for custom styling */
  className?: string
  /** Add style object for custom styling */
  style?: React.CSSProperties
}
/** Alert component to render `info`, `warning`, `success` and `error` messages */
export declare function Alert({
  type,
  title,
  content,
  icon,
  actions,
  closable,
  onClose,
  className,
  style,
}: AlertProps): JSX.Element
export declare namespace Alert {
  var AlertButton: React.ForwardRefExoticComponent<
    Omit<import('../button/button').ButtonProps, 'ref' | 'buttonType'> & {
      buttonType?: import('./alert-button').ButtonType
      className?: string
    } & React.RefAttributes<HTMLButtonElement>
  > & {
    ButtonType: typeof import('./alert-button').ButtonType
  }
}
