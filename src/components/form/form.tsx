import React from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import FormContext from './form-context'
import FormItem from './form-item'

export type FormProps = {
  children: React.ReactNode
  className: string
  onSubmit: (data: any) => void
}

export function Form({ children, className, onSubmit }: FormProps) {
  const { register, handleSubmit } = useForm()
  return (
    <form
      className={clsx('p-8 border space-y-4', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormContext.Provider value={{ register }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

Form.Item = FormItem
