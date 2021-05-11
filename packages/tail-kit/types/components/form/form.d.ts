import React from 'react'
import { FormItemLayout } from './form-item'
export declare enum LayoutOptions {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  INLINE = 'inline',
}
/**
 * Form properties
 */
export declare type FormProps = {
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
export declare const Form: React.ForwardRefExoticComponent<
  FormProps & React.RefAttributes<HTMLFormElement>
>
