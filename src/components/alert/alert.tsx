import React, { useMemo, cloneElement } from 'react'
import clsx from 'clsx'
import {
  HiInformationCircle,
  HiCheckCircle,
  HiXCircle,
  HiExclamation,
  HiX,
} from 'react-icons/hi'
import { AlertButton } from './alert-button'
import { AlertContext } from './alert-context'

export enum AlertType {
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

/**
 * Alert properties
 */
export type AlertProps = {
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
export function Alert({
  type = AlertType.info,
  title,
  content,
  icon,
  actions,
  closable = false,
  onClose,
  className,
  style,
}: AlertProps) {
  // Get base color for icon and Alert.Button styles
  const baseColor = useMemo(() => {
    if (type === AlertType.info) {
      return 'blue'
    } else if (type === AlertType.success) {
      return 'green'
    } else if (type === AlertType.warning) {
      return 'yellow'
    } else if (type === AlertType.error) {
      return 'red'
    }
    return 'blue'
  }, [type])

  // Function to return icon, based on user input and alert type
  const alertIcon = useMemo(() => {
    if (icon === false) {
      return null
    }

    if (icon && typeof icon !== 'boolean') {
      return cloneElement(icon, { className: `w-5 h-5 text-${baseColor}-400` })
    }

    if (type === AlertType.info) {
      return (
        <HiInformationCircle
          className={`w-5 h-5 text-${baseColor}-400`}
          data-testid="info-icon"
        />
      )
    } else if (type === AlertType.success) {
      return (
        <HiCheckCircle
          className={`w-5 h-5 text-${baseColor}-400`}
          data-testid="success-icon"
        />
      )
    } else if (type === AlertType.warning) {
      return (
        <HiExclamation
          className={`w-5 h-5 text-${baseColor}-400`}
          data-testid="warning-icon"
        />
      )
    } else if (type === AlertType.error) {
      return (
        <HiXCircle
          className={`w-5 h-5 text-${baseColor}-400`}
          data-testid="error-icon"
        />
      )
    }
    return null
  }, [icon, type, baseColor])

  return (
    <div
      className={clsx(
        `px-4 py-4 rounded-md space-x-2 flex items-start justify-between bg-${baseColor}-50`,
        className,
      )}
      style={style}
    >
      <div className="flex-shrink-0" data-testid="icon">
        {alertIcon}
      </div>

      <div className={clsx(`flex-1 space-y-3 text-${baseColor}-700`)}>
        <div className="text-sm font-semibold">{title}</div>
        {content ? <div className="text-sm">{content}</div> : null}
        <AlertContext.Provider value={{ baseColor }}>
          {actions ? <div className="flex space-x-4">{actions}</div> : null}
        </AlertContext.Provider>
      </div>
      {closable ? (
        <button
          className="flex-shrink-0 p-1 rounded focus:shadow-outline focus:outline-none"
          onClick={onClose}
          data-testid="close-button"
        >
          <HiX className={clsx(`w-4 h-4 text-${baseColor}-700`)} />
        </button>
      ) : null}
    </div>
  )
}

Alert.AlertButton = AlertButton
