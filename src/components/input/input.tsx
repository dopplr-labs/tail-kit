import React, { cloneElement, forwardRef } from 'react'
import clsx from 'clsx'

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  icon?: JSX.Element
  inputClassName?: string
  inputStyle?: React.CSSProperties
}

export const Input = forwardRef(
  (
    {
      icon,
      className,
      style,
      inputClassName,
      inputStyle,
      ...restProps
    }: InputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    return (
      <div
        className={clsx(
          'px-3 py-2 focus-within:shadow-outline rounded-md border flex items-center space-x-3 text-gray-400',
          className,
        )}
        style={style}
      >
        {icon ? cloneElement(icon, { className: 'w-5 h-5' }) : null}
        <input
          className={clsx(
            'text-sm font-sans text-gray-800 placeholder-gray-400 flex-1 focus:outline-none',
            inputClassName,
          )}
          style={inputStyle}
          {...restProps}
          ref={ref}
        />
      </div>
    )
  },
)

Input.displayName = 'Input'
