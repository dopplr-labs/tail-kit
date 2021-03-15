import React from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import FormContext from './form-context'
import FormItem from './form-item'

export type FormProps = {
  children: React.ReactNode
  className?: string
  defaultValues?: any
  onSubmit: (data: any) => void
}

export function Form({
  children,
  className,
  defaultValues,
  onSubmit,
}: FormProps) {
  const { register, handleSubmit, errors } = useForm({ defaultValues })
  return (
    <form
      className={clsx('p-8 border space-y-4', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormContext.Provider value={{ register, errors }}>
        {children}
      </FormContext.Provider>
    </form>
  )
}

Form.Item = FormItem
