import React, { cloneElement, useContext, useMemo } from 'react'
import clsx from 'clsx'
import { Controller, RegisterOptions } from 'react-hook-form'
import FormContext from './form-context'
import { LayoutOptions } from './form'

type FormItemRule = RegisterOptions & { message: string }
export type FormItemLayout = {
  span?: number
  offset?: number
}

/**
 * FormItem Properties
 */
export type FormItemProps = {
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

const DEFAULT_LABEL_WIDTH = 1
const DEFAULT_LABEL_OFFSET = 0
const DEFAULT_WRAPPER_WIDTH = 5
const DEFAULT_WRAPPER_OFFSET = 0

export function FormItem({
  children,
  className,
  extra,
  label,
  labelCol,
  name,
  rules = [],
  valuePropName = 'value',
  wrapperCol,
}: FormItemProps) {
  const { errors, layout, formLabelCol, formWrapperCol, control } =
    useContext(FormContext)

  if (!control) {
    throw new Error('Form.Item component should be used within Form component')
  }

  const labelColWidth = useMemo(() => {
    if (labelCol?.span) {
      return labelCol.span
    } else if (formLabelCol?.span) {
      return formLabelCol.span
    }
    return DEFAULT_LABEL_WIDTH
  }, [labelCol, formLabelCol])

  const labelColOffset = useMemo(() => {
    if (labelCol?.offset) {
      return labelCol.offset
    } else if (formLabelCol?.offset) {
      return formLabelCol.offset
    }
    return DEFAULT_LABEL_OFFSET
  }, [labelCol, formLabelCol])

  const wrapperColWidth = useMemo(() => {
    if (wrapperCol?.span) {
      return wrapperCol.span
    } else if (formWrapperCol?.span) {
      return formWrapperCol.span
    }
    return DEFAULT_WRAPPER_WIDTH
  }, [formWrapperCol, wrapperCol])

  const wrapperColOffset = useMemo(() => {
    if (wrapperCol?.offset) {
      return wrapperCol.offset
    } else if (formWrapperCol?.offset) {
      return formWrapperCol.offset
    }
    return DEFAULT_WRAPPER_OFFSET
  }, [formWrapperCol, wrapperCol])

  const validationScehma = useMemo(() => {
    const schema: any = {}
    rules.forEach((element) => {
      schema[Object.keys(element)[0]] = Object.values(element)[0]
    })
    return schema
  }, [rules])

  return (
    <div
      className={clsx(
        layout === LayoutOptions.VERTICAL
          ? 'flex flex-col space-y-2'
          : layout === LayoutOptions.HORIZONTAL
          ? 'grid grid-cols-1 space-y-2 lg:space-y-0 lg:grid-cols-6 items-center'
          : layout === LayoutOptions.INLINE
          ? 'flex items-center space-x-4'
          : undefined,
        className,
      )}
    >
      {label ? (
        <label
          htmlFor={name}
          className={clsx(
            'text-sm font-semibold text-gray-600',
            layout === LayoutOptions.HORIZONTAL
              ? `lg:col-span-${labelColWidth} lg:col-start-${labelColOffset} lg:text-right lg:px-2`
              : undefined,
          )}
        >
          {validationScehma.required ? (
            <span className="text-red-600">*</span>
          ) : null}
          {label}{' '}
          {layout === LayoutOptions.HORIZONTAL ||
          layout === LayoutOptions.INLINE
            ? ':'
            : null}
        </label>
      ) : null}
      <div
        className={clsx(
          layout === LayoutOptions.HORIZONTAL
            ? `lg:col-span-${wrapperColWidth} lg:col-start-${wrapperColOffset}`
            : undefined,
        )}
      >
        <Controller
          control={control}
          name={name ?? ''}
          render={({ onChange, value, ref }) =>
            cloneElement(children, {
              [valuePropName]: children.props.value ?? value,
              onChange: (event: any[]) => {
                const childrenOnChange = children?.props?.onChange
                if (childrenOnChange) {
                  childrenOnChange(event)
                }
                // @TODO: Remove the hard coded value once the controller is removed
                if (valuePropName === 'checked') {
                  // @ts-ignore
                  onChange(event.target.checked)
                } else {
                  onChange(event)
                }
              },
              ref,
            })
          }
          rules={validationScehma}
        />
        {extra ? <>{extra}</> : null}
        {name &&
          rules
            ?.filter((rule) => {
              return errors[name]?.type === Object.keys(rule)[0]
            })
            .map((rule) => (
              <div
                className="absolute mt-1 text-xs text-red-500"
                key={rule.message}
              >
                {rule.message}
              </div>
            ))}
      </div>
    </div>
  )
}
