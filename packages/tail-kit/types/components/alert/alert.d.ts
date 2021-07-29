import React from 'react'
/**
 * Alert properties
 */
export declare type AlertProps = {
  /** Type of the alert to use predefined icons and styles */
  type?: 'info' | 'success' | 'warning' | 'error'
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
