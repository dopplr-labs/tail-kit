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
import { ToastsContext } from './toast-context'

type ToastProviderProps = {
  children: React.ReactElement
}

export enum ToastTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export type ToastListType = {
  id: string
  title: string
  description?: string
  type?: ToastTypes
}

export function ToastProvider({ children }: ToastProviderProps) {
  const toastContainer = useRef<HTMLDivElement>(document.createElement('div'))

  useLayoutEffect(() => {
    const container = toastContainer.current
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  const [toasts, setToasts] = useState<ToastListType[]>([])

  const removeToast = (id: string) => {
    setToasts((prevState) => {
      if (prevState.find((toast) => toast.id === id)) {
        return prevState.filter((toast) => toast.id !== id)
      }
      return prevState
    })
  }

  const dispatchToast = (type: ToastTypes) => (
    title: string,
    dismissTime?: number,
  ) => {
    const toastId = (
      Math.random().toString(36) + Date.now().toString(36)
    ).substr(2, 10)

    setToasts((prevState) => [...prevState, { id: toastId, title, type }])

    setTimeout(() => {
      removeToast(toastId)
    }, dismissTime ?? 3000)

    return toastId
  }

  const info = dispatchToast(ToastTypes.INFO)
  const success = dispatchToast(ToastTypes.SUCCESS)
  const warning = dispatchToast(ToastTypes.WARNING)
  const error = dispatchToast(ToastTypes.ERROR)

  return (
    <>
      <ToastsContext.Provider
        value={{ toast: { info, success, warning, error }, removeToast }}
      >
        {children}
      </ToastsContext.Provider>
      {createPortal(
        <TransitionGroup className="fixed inset-0 z-10 flex flex-col items-center justify-start px-4 py-6 space-y-4 pointer-events-none">
          {toasts.map((toast) => (
            <CSSTransition
              timeout={200}
              classNames="toast-right"
              key={toast.id}
              unmountOnExit
            >
              <Toast toast={toast} />
            </CSSTransition>
          ))}
        </TransitionGroup>,
        toastContainer.current,
      )}
    </>
  )
}

type ToastProps = {
  toast: ToastListType
  closeIcon?: boolean
}

function Toast({ toast }: ToastProps) {
  const toastIcon = useCallback((type) => {
    switch (type) {
      case ToastTypes.INFO:
        return (
          <div className="text-blue-500 ">
            <InformationCircleOutline />
          </div>
        )
      case ToastTypes.SUCCESS:
        return (
          <div className="flex-shrink-0 text-green-500">
            <CheckCircleOutline />
          </div>
        )
      case ToastTypes.WARNING:
        return (
          <div className="flex-shrink-0 text-yellow-300">
            <ExclamationCircleOutline />
          </div>
        )
      case ToastTypes.ERROR:
        return (
          <div className="flex-shrink-0 text-red-500">
            <XCircleOutline />
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
      {toastIcon(toast.type)}
      <div className="ml-3 flex-1 pt-0.5 text-sm font-medium text-gray-900">
        {toast.title}
      </div>
    </div>
  )
}

export function useToasts() {
  return useContext(ToastsContext)
}
