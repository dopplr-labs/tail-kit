import React from 'react'
import clsx from 'clsx'

/** Button Spinner propertier */
export type ButtonSpinnerProps = {
  /** additional class names */
  className?: string
  /** additional styles */
  style?: React.CSSProperties
}

/** Component for rendering spinner inside the `Button` component when `loading=true` */
export function ButtonSpinner({ className, style }: ButtonSpinnerProps) {
  return (
    <svg
      className={clsx('w-5 h-5 animate-spin', className)}
      data-testid="button-spinner"
      style={style}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
