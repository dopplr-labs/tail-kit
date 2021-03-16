import React from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import FormContext from './form-context'
import FormItem, { FormItemLayout } from './form-item'

export enum LayoutOptions {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  INLINE = 'inline',
}

export type FormProps = {
  children: React.ReactNode
  className?: string
  defaultValues?: any
  layout?: LayoutOptions
  labelCol?: FormItemLayout
  wrapperCol?: FormItemLayout
  onSubmit: (data: any) => void
}

export function Form({
  children,
  className,
  defaultValues,
  layout = LayoutOptions.HORIZONTAL,
  labelCol,
  wrapperCol,
  onSubmit,
}: FormProps) {
  const { register, handleSubmit, errors } = useForm({ defaultValues })
  return (
    <form
      className={clsx(
        'p-8',
        layout === LayoutOptions.INLINE
          ? 'flex flex-wrap space-x-4'
          : 'space-y-6',
        className,
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormContext.Provider
        value={{
          register,
          errors,
          layout,
          formLabelCol: labelCol,
          formWrapperCol: wrapperCol,
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  )
}

Form.Item = FormItem
