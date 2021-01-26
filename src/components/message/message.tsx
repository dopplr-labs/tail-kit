import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  CheckCircleOutline,
  ExclamationCircleOutline,
  InformationCircleOutline,
  XCircleOutline,
} from 'components/icons'
import { ButtonSpinner } from 'components/button/button-spinner'
import { MessageContext } from './message-context'

export enum MessageTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  LOADING = 'loading',
}

export type MessageListType = {
  id: string
  title: string
  type?: MessageTypes
}

/**
 * MessageProvider properties
 */
type MessageProviderProps = {
  /** wrap your App within MessageProvider component */
  children: React.ReactElement
  /** default time (in milli-seconds) after which Message component will disappear */
  defaultDismissTime?: number
}

/**
 * Display global messages as feedback in response to user operations.
 *
 * ### When to use
 * * To provide feedback such as success, warning, error etc.
 * * A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.
 * * Mostly useful to notify user for success or error API response
 *
 * ### How to use
 *
 * * Wrap your `<App />` within `<MessageProvider />` component
 * * Import useMessage hook wherever you want to render `Message` component
 * * useMessage provides you 2 methods which you can access using `const { message, removeMessage } = useMessage()`
 *
 * There are 5 different types of messages available to user. You can pass the string which you want to render in `Message` component as argument.
 *
 * * `message.info()`
 * * `message.success()`
 * * `message.error()`
 * * `message.warning()`
 * * `message.loading()`
 *
 * Use `removeMessage()` method to programmatically remove a message. `removeMessage()` takes the id of `Message` component you want to remove.
 * All `message` methods return the id of the message which you can use with `removeMessage()`
 */

export function MessageProvider({
  children,
  defaultDismissTime = 3000,
}: MessageProviderProps) {
  const toastContainer = useRef<HTMLDivElement>(document.createElement('div'))

  useLayoutEffect(() => {
    const container = toastContainer.current
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  const [messages, setMessages] = useState<MessageListType[]>([])

  const removeMessage = (id: string) => {
    setMessages((prevState) => {
      if (prevState.find((message) => message.id === id)) {
        return prevState.filter((message) => message.id !== id)
      }
      return prevState
    })
  }

  const dispatchMessage = (type: MessageTypes) => (
    title: string,
    dismissTime?: number,
  ) => {
    const messageId = (
      Math.random().toString(36) + Date.now().toString(36)
    ).substr(2, 10)

    setMessages((prevState) => [...prevState, { id: messageId, title, type }])

    setTimeout(() => {
      removeMessage(messageId)
    }, dismissTime ?? defaultDismissTime)

    return messageId
  }

  const info = dispatchMessage(MessageTypes.INFO)
  const success = dispatchMessage(MessageTypes.SUCCESS)
  const warning = dispatchMessage(MessageTypes.WARNING)
  const error = dispatchMessage(MessageTypes.ERROR)
  const loading = dispatchMessage(MessageTypes.LOADING)

  return (
    <>
      <MessageContext.Provider
        value={{
          message: { info, success, warning, error, loading },
          removeMessage,
        }}
      >
        {children}
      </MessageContext.Provider>
      {createPortal(
        <TransitionGroup className="fixed inset-0 z-10 flex flex-col items-center justify-start px-4 py-6 space-y-4 pointer-events-none">
          {messages.map((message) => (
            <CSSTransition
              timeout={200}
              classNames="toast-right"
              key={message.id}
              unmountOnExit
            >
              <Message message={message} />
            </CSSTransition>
          ))}
        </TransitionGroup>,
        toastContainer.current,
      )}
    </>
  )
}

type MessageProps = {
  message: MessageListType
  closeIcon?: boolean
}

function Message({ message }: MessageProps) {
  const toastIcon = useCallback((type) => {
    switch (type) {
      case MessageTypes.INFO:
        return (
          <div className="text-blue-500 ">
            <InformationCircleOutline />
          </div>
        )
      case MessageTypes.SUCCESS:
        return (
          <div className="flex-shrink-0 text-green-500">
            <CheckCircleOutline />
          </div>
        )
      case MessageTypes.WARNING:
        return (
          <div className="flex-shrink-0 text-yellow-300">
            <ExclamationCircleOutline />
          </div>
        )
      case MessageTypes.ERROR:
        return (
          <div className="flex-shrink-0 text-red-500">
            <XCircleOutline />
          </div>
        )
      case MessageTypes.LOADING:
        return (
          <div className="flex-shrink-0 text-gray-500">
            <ButtonSpinner />
          </div>
        )
      default:
        return (
          <div className="flex-shrink-0 text-blue-500">
            <InformationCircleOutline />
          </div>
        )
    }
  }, [])

  return (
    <div className="flex items-start p-4 overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto toast ring-1 ring-black ring-opacity-5">
      {toastIcon(message.type)}
      <div className="flex-1 ml-3 text-sm font-medium text-gray-900">
        {message.title}
      </div>
    </div>
  )
}

export function useMessage() {
  return useContext(MessageContext)
}
