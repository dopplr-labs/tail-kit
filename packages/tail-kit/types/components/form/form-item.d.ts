import React from 'react'
import { RegisterOptions } from 'react-hook-form'
declare type FormItemRule = RegisterOptions & {
  message: string
}
export declare type FormItemLayout = {
  span?: number
  offset?: number
}
/**
 * FormItem Properties
 */
export declare type FormItemProps = {
  /** Form Field to render within FormItem component */
  children: React.ReactElement
  /** Customize FormItem styles using className */
  className?: string
  /** extra prop can be used to render prompt message or field description below the Field Input */
  extra?: React.ReactElement
  /** Label Text for Form Field */
  label?: string
  /** The layout for label. You can set `span` `offset` to something like `{span: 1, offset: 1}`.
   *  You can set labelCol on Form which will not affect nest Item. If both exists, use Item first.
   */
  labelCol?: FormItemLayout
  /** Field name */
  name?: string
  /** Rules for field validation */
  rules?: FormItemRule[]
  /** The name of the prop used to as value */
  valuePropName?: string
  /** The layout for input controls, same as `labelCol`.
   * You can set wrapperCol on Form which will not affect nest Item. If both exists, use Item first
   */
  wrapperCol?: FormItemLayout
}
export declare function FormItem({
  children,
  className,
  extra,
  label,
  labelCol,
  name,
  rules,
  valuePropName,
  wrapperCol,
}: FormItemProps): JSX.Element
export {}
