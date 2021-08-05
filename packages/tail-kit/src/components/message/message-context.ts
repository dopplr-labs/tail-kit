/* istanbul ignore file */
import { createContext } from 'react'
import { MessageOptions } from './message'

export const MessageContext = createContext<{
  message: {
    // eslint-disable-next-line func-call-spacing
    info: (title: string, options?: MessageOptions) => string
    success: (title: string, options?: MessageOptions) => string
    warning: (title: string, options?: MessageOptions) => string
    error: (title: string, options?: MessageOptions) => string
    loading: (title: string, options?: MessageOptions) => string
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

MessageContext.displayName = 'MessageContext'
