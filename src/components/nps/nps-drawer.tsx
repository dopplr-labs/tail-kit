import React from 'react'
import Drawer from 'components/drawer'
import { DrawerPlacement } from 'components/drawer/drawer'
import { NPSInput } from './nps'

export type NPSDrawerProps = {
  visible: boolean
  title?: string
  message?: (score: number) => React.ReactNode
  onSubmit?: (score: number) => void
  onDismiss?: () => void
}

export function NPSDrawer({
  visible,
  title,
  message,
  onSubmit,
  onDismiss,
}: NPSDrawerProps) {
  return (
    <Drawer
      visible={visible}
      closable
      className="h-auto"
      size={128}
      placement={DrawerPlacement.bottom}
      onRequestClose={onDismiss}
    >
      <NPSInput
        title={title}
        onSubmit={onSubmit}
        message={message}
        className="h-20"
      />
    </Drawer>
  )
}
