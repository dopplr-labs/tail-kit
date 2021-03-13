import { createContext } from 'react'
import { FieldErrors, RegisterOptions } from 'react-hook-form'

const FormContext = createContext<{
  register: (rules?: RegisterOptions) => void
  errors: FieldErrors
}>({
  register: () => {},
  errors: () => {},
})

export default FormContext
