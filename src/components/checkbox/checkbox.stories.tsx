import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { Meta } from '@storybook/react/types-6-0'
import { Checkbox } from './checkbox'

export default {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
} as Meta

export function DefaultCheckbox() {
  const [checked, setChecked] = useState(true)
  return (
    <Checkbox
      label="Remember Me"
      value="rememberMe"
      checked={checked}
      onChange={() => {
        setChecked((prevState) => !prevState)
      }}
    />
  )
}

export function DisabledCheckbox() {
  return (
    <div className="flex flex-col space-y-2">
      <Checkbox disabled={true} label="Unchecked-Disabled" />
      <Checkbox disabled={true} checked={true} label="Checked-Disabled" />
    </div>
  )
}

export function CheckboxWithError() {
  const [termsAgreed, setTermsAgreed] = useState(false)
  return (
    <Checkbox
      checked={termsAgreed}
      onChange={() => {
        setTermsAgreed((prevState) => !prevState)
      }}
      label="I agree to the terms and conditions"
      error={!termsAgreed}
    />
  )
}

export function IndeterminateChecbox() {
  const plainOptions = ['Apple', 'Pear', 'Orange']

  const [indeterminate, setIndeterminate] = useState(true)
  const [checkedValues, setCheckedValues] = useState(['Pear'])
  const [checkAll, setCheckAll] = useState(false)

  function onChange(checkedList: string[]) {
    setCheckedValues(checkedList)
    setIndeterminate(
      !!checkedList.length && checkedList.length < plainOptions.length,
    )
    setCheckAll(checkedList.length === plainOptions.length)
  }

  function onCheckAllChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCheckAll((prevState) => !prevState)
    setIndeterminate(false)
    setCheckedValues(event.target.checked ? plainOptions : [])
  }
  return (
    <div className="inline-block p-4 space-y-4 ">
      <Checkbox
        label="Check All"
        indeterminate={indeterminate}
        checked={checkAll}
        onChange={onCheckAllChange}
      />
      <div className="border-b-2 border-gray-300" />
      <Checkbox.Group
        options={plainOptions}
        defaultValue={checkedValues}
        onChange={onChange}
      />
    </div>
  )
}

export function CheckboxGroup() {
  function onChange(checkedValues: string[]) {
    action(`checked = ${checkedValues}`)
  }
  const plainOptions = ['Apple', 'Pear', 'Orange']
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ]
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
  ]
  return (
    <div className="space-y-6">
      <Checkbox.Group
        options={plainOptions}
        defaultValue={['Apple', 'Orange']}
        onChange={onChange}
      />
      <Checkbox.Group options={options} defaultValue={['Pear']} />
      <Checkbox.Group
        options={optionsWithDisabled}
        defaultValue={['Apple']}
        disabled
      />
    </div>
  )
}
