import { createContext } from 'react'

export const ToastsContext = createContext<{
  toast: {
    // eslint-disable-next-line func-call-spacing
    info: (title: string, dismissTime?: number) => string
    success: (title: string, dismissTime?: number) => string
    warning: (title: string, dismissTime?: number) => string
    error: (title: string, dismissTime?: number) => string
  }
  removeToast: (id: string) => void
}>({
  toast: {
    info: () => '',
    success: () => '',
    warning: () => '',
    error: () => '',
  },
  removeToast: () => {},
})
