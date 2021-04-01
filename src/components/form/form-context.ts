import { createContext } from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import { FormItemLayout } from './form-item'

enum LayoutOptions {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  INLINE = 'inline',
}

const FormContext = createContext<{
  errors: FieldErrors
  layout: LayoutOptions
  formLabelCol?: FormItemLayout
  formWrapperCol?: FormItemLayout
  control?: Control
}>({
  errors: () => {},
  layout: LayoutOptions.VERTICAL,
  formLabelCol: undefined,
  formWrapperCol: undefined,
})

export default FormContext
