import { createContext } from 'react'

const FormContext = createContext<{ register: () => void }>({
  register: () => {},
})

export default FormContext
