import { createContext } from 'react'

export const AlertContext = createContext<{ baseColor: string }>({
  baseColor: 'string',
})
