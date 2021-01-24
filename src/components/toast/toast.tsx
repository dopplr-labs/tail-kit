import React, { useCallback, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  CheckCircleOutline,
  ExclamationCircleOutline,
  InformationCircleOutline,
  XCircleOutline,
  XOutline,
} from 'components/icons'
import useSyncedState from 'hooks/use-synced-states'

export type ToastListType = {
  id: string
  title: string
  description?: string
  type?: ToastTypes
}

export enum ToastTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

/**
 * Toast properties
 */
export type ToastProps = {
  toastList: ToastListType[]
  /** Whether automatically dismiss toast or not */
  autoDelete?: boolean
  /** Time after which toast will dismiss */
  dismissTime?: number
  /** Whether to show close icon in toast or not */
  closeIcon?: boolean
}

export function Toast({
  toastList,
  autoDelete = true,
  dismissTime = 1500,
  closeIcon = false,
}: ToastProps) {
  const [list, setList] = useSyncedState(toastList)

  const deleteToast = useCallback(
    (id: string) => {
      const toastListItem = toastList.findIndex((toast) => toast.id === id)
      toastList.splice(toastListItem, 1)
      setList((prevState) => prevState.filter((toast) => toast.id !== id))
    },
    [setList, toastList],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && list.length) {
        deleteToast(list[0].id)
      }
    }, dismissTime)

    return () => {
      clearInterval(interval)
    }
  }, [deleteToast, list, autoDelete, dismissTime])

  const toastIcon = useCallback((type) => {
    switch (type) {
      case ToastTypes.INFO:
        return (
          <div className="flex-shrink-0 text-blue-500">
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
    <TransitionGroup className="fixed inset-0 z-10 flex flex-col items-end justify-start px-4 py-6 space-y-4 pointer-events-none">
      {list.map((toast) => (
        <CSSTransition
          in={list.indexOf(toast) !== -1}
          timeout={200}
          classNames="toast-right"
          key={toast.id}
          unmountOnExit
        >
          <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto toast ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                {toastIcon(toast.type)}

                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">
                    {toast.title}
                  </p>

                  {toast.description ? (
                    <p className="mt-1 text-sm text-gray-500">
                      {toast.description}
                    </p>
                  ) : null}
                </div>

                {closeIcon ? (
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        deleteToast(toast.id)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XOutline />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
