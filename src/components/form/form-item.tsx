import React, { cloneElement, useContext } from 'react'
import FormContext from './form-context'

export type FormItemProps = {
  name: string
  label: string
  children: React.ReactElement
}

export default function FormItem({ name, label, children }: FormItemProps) {
  const { register } = useContext(FormContext)

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      {cloneElement(children, { id: name, name, ref: register })}
    </div>
  )
}
