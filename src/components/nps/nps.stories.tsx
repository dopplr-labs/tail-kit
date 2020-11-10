import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import Button from 'components/button'
import { NPSInput } from './nps'
import { NPSDrawer } from './nps-drawer'

export default {
  title: 'Survey/NPS',
  component: NPSInput,
} as Meta

export function DefaultNps() {
  function handleSubmit(score: number) {
    action('Submitted score: ')(score)
  }
  return <NPSInput onSubmit={handleSubmit} />
}

export function WithCustomTitle() {
  function handleSubmit(score: number) {
    action('Submitted score: ')(score)
  }

  return (
    <NPSInput
      onSubmit={handleSubmit}
      title="How likely would you recommend tail-kit to your firends and colleagues"
    />
  )
}

export function WithCustomMessage() {
  const [reset, setReset] = useState(0)

  function handleSubmit(score: number) {
    action('Submitted score: ')(score)
  }

  function message(score: number) {
    return score > 8 ? (
      <div className="flex items-center space-x-3">
        <span className="text-3xl">🎉</span>
        <span>Thank you for your feedback!</span>
      </div>
    ) : (
      <div className="flex items-center space-x-3">
        <span className="text-3xl">😞</span>
        <span>Uh-oh! We will try to improve in future</span>
      </div>
    )
  }
  function handleClick() {
    setReset((prevState) => (prevState === 0 ? 1 : 0))
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <NPSInput onSubmit={handleSubmit} message={message} key={reset} />
      <Button label="Reset" onClick={handleClick} />
    </div>
  )
}

export function NPSInDrawer() {
  const [show, setShow] = useState(false)

  function showDrawer() {
    setShow(true)
  }

  function onClose() {
    setShow(false)
  }

  return (
    <>
      <Button label="Open NPS Drawer" onClick={showDrawer} />
      <NPSDrawer visible={show} onDismiss={onClose} />
    </>
  )
}
