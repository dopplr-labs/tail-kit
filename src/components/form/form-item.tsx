import React, { cloneElement, useContext } from 'react'
import { RegisterOptions } from 'react-hook-form'
import FormContext from './form-context'

type FormItemRules = RegisterOptions & { message: string }

export type FormItemProps = {
  name: string
  label?: string
  children: React.ReactElement
  rules?: FormItemRules[]
}

export default function FormItem({
  name,
  label,
  children,
  rules = [],
}: FormItemProps) {
  const { register, errors } = useContext(FormContext)
  const schema: any = {}
  rules.forEach((element) => {
    schema[Object.keys(element)[0]] = Object.values(element)[0]
  })

  return (
    <div className="flex flex-col space-y-2">
      {label ? (
        <label htmlFor={name} className="text-gray-700">
          {label}
        </label>
      ) : null}
      {cloneElement(children, { id: name, name, ref: register(schema) })}
      {rules
        ?.filter((rule) => {
          return errors[name]?.type === Object.keys(rule)[0]
        })
        .map((rule) => (
          <span className="text-xs text-red-500" key={rule.message}>
            {rule.message}
          </span>
        ))}
    </div>
  )
}
