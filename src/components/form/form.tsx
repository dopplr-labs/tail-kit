import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import FormContext from './form-context'
import { FormItem, FormItemLayout } from './form-item'

export enum LayoutOptions {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  INLINE = 'inline',
}

/**
 * Form properties
 */
export type FormProps = {
  /** Form Items to render within Form component */
  children: React.ReactNode
  /** Customize Form styles using className */
  className?: string
  /** Initialize Form component with default values */
  defaultValues?: any
  /** Select your preferred Form layout from `Horizontal`, `Vertical` and `Inline` */
  layout?: LayoutOptions
  /** Label Layout, works when form layout is `Horizontal`. Set `span` `offset` values like `{span: 2, offset: 1}`  */
  labelCol?: FormItemLayout
  /** The layout for Input controls, same as `labelCol` */
  wrapperCol?: FormItemLayout
  /** Trigger after submitting the form and verifying data successfully */
  onSubmit?: (data: any) => void
}

export const FormComponent = forwardRef(
  (
    {
      children,
      className,
      defaultValues,
      layout = LayoutOptions.HORIZONTAL,
      labelCol,
      wrapperCol,
      onSubmit = () => {},
    }: FormProps,
    ref: React.Ref<HTMLFormElement>,
  ) => {
    const { handleSubmit, errors, control, formState } = useForm({
      defaultValues,
      mode: 'onChange', // isValid works only with onChange mode. But this causes multiple re-renders
    })
    const { isSubmitting, isDirty, isValid } = formState

    return (
      <form
        className={clsx(
          layout === LayoutOptions.INLINE
            ? 'flex flex-wrap space-x-4'
            : 'space-y-6',
          className,
        )}
        onSubmit={handleSubmit(onSubmit)}
        ref={ref}
      >
        <FormContext.Provider
          value={{
            errors,
            layout,
            control,
            formLabelCol: labelCol,
            formWrapperCol: wrapperCol,
          }}
        >
          {typeof children === 'function'
            ? children({ isSubmitting, isValid, isDirty })
            : children}
        </FormContext.Provider>
      </form>
    )
  },
)

export const Form = Object.assign(FormComponent, {
  Item: FormItem,
  Layout: LayoutOptions,
})
