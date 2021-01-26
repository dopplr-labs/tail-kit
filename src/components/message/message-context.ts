import { createContext } from 'react'

export const MessageContext = createContext<{
  message: {
    // eslint-disable-next-line func-call-spacing
    info: (title: string, dismissTime?: number) => string
    success: (title: string, dismissTime?: number) => string
    warning: (title: string, dismissTime?: number) => string
    error: (title: string, dismissTime?: number) => string
    loading: (title: string, dismissTime?: number) => string
  }
  removeMessage: (id: string) => void
}>({
  message: {
    info: () => '',
    success: () => '',
    warning: () => '',
    error: () => '',
    loading: () => '',
  },
  removeMessage: () => {},
})
