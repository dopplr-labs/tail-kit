import clsx from 'clsx'
import React from 'react'
import ReactDOM from 'react-dom'

export type DrawerProps = {
  visible: boolean
  placement?: 'left' | 'right' | 'top' | 'bottom'
}

export function Drawer({ visible, placement = 'right' }: DrawerProps) {
  const drawerContainer = document.createElement('div')
  drawerContainer.id = 'drawer-container'
  drawerContainer.style.position = 'relative'
  drawerContainer.style.zIndex = '100'
  document.body.appendChild(drawerContainer)

  return (
    <>
      {visible
        ? ReactDOM.createPortal(
            <div
              className={clsx(
                'fixed inset-0 flex justify-start w-full h-full bg-black bg-opacity-75',
                placement === 'right'
                  ? 'justify-end'
                  : placement === 'left'
                  ? 'justify-start'
                  : undefined,
              )}
            >
              <div className="w-64 h-full bg-white" />
            </div>,
            drawerContainer,
          )
        : null}
    </>
  )
}
