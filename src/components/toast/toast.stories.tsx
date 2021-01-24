import React, { useState } from 'react'
import Radio from 'components/radio'
import Button from 'components/button'
import { Meta } from '@storybook/react/types-6-0'
import { Toast, ToastListType, ToastTypes } from './toast'

export default { title: 'Feedback/Toast', component: Toast } as Meta

export function SimpleToast() {
  const [list, setList] = useState<ToastListType[] | []>([])

  function showToast() {
    const toastProperties = {
      id: (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10),
      title: 'Successfully saved!',
    }
    setList((prevState) => [...prevState, toastProperties])
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <Button
          label="Show Toast"
          buttonType={Button.ButtonType.primary}
          onClick={showToast}
        />
      </div>
      <Toast toastList={list} />
    </>
  )
}

export function DifferentTypesOfToasts() {
  const [list, setList] = useState<ToastListType[] | []>([])
  const [type, setType] = useState(ToastTypes.INFO)

  const options = [
    { label: 'Info', value: ToastTypes.INFO },
    { label: 'Success', value: ToastTypes.SUCCESS },
    { label: 'Warning', value: ToastTypes.WARNING },
    { label: 'Error', value: ToastTypes.ERROR },
  ]
  function showToast() {
    const toastProperties = {
      id: (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10),
      title: 'Successfully saved!',
      type,
    }
    setList((prevState) => [...prevState, toastProperties])
  }
  return (
    <>
      <div className="space-y-4">
        <Radio.RadioGroup
          options={options}
          defaultValue={ToastTypes.INFO}
          onChange={(value) => {
            setType(value as ToastTypes)
          }}
        />
        <Button
          label="Show Toast"
          buttonType={Button.ButtonType.primary}
          onClick={showToast}
        />
      </div>
      <Toast toastList={list} />
    </>
  )
}

export function ToastWithDescription() {
  const [list, setList] = useState<ToastListType[] | []>([])

  function showToast() {
    const toastProperties = {
      id: (Math.random().toString(36) + Date.now().toString(36)).substr(2, 10),
      title: 'Successfully saved!',
      description: 'Anyone with the link can now view this file.',
      type: ToastTypes.SUCCESS,
    }
    setList((prevState) => [...prevState, toastProperties])
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <Button
          label="Show Toast"
          buttonType={Button.ButtonType.primary}
          onClick={showToast}
        />
        <Toast toastList={list} closeIcon />
      </div>
    </>
  )
}
