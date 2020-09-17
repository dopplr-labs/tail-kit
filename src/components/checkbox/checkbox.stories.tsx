import React, { useCallback, useState } from 'react'
import { action } from '@storybook/addon-actions'
import { Meta } from '@storybook/react/types-6-0'
import { Checkbox } from './checkbox'

export default {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
} as Meta

export function DefaultCheckbox() {
  return <Checkbox label="Remember Me" value="rememberMe" />
}

export function DisabledCheckbox() {
  return (
    <div className="flex flex-col space-y-2">
      <Checkbox disabled={true} label="Unchecked-Disabled" />
      <Checkbox
        disabled={true}
        defaultChecked={true}
        label="Checked-Disabled"
      />
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

export function IndeterminateCheckbox() {
  const options = ['Apple', 'Pear', 'Orange']
  const [checkedValues, setCheckedValues] = useState(['Pear'])

  const onChange = useCallback((checkedList: string[]) => {
    setCheckedValues(checkedList)
  }, [])

  return (
    <div className="inline-block p-4 space-y-4 ">
      <Checkbox
        label="Check All"
        checked={
          checkedValues.length === options.length
            ? true
            : checkedValues.length === 0
            ? false
            : 'indeterminate'
        }
        onChange={(event) => {
          if (event.target.checked) {
            setCheckedValues(options)
          } else {
            setCheckedValues([])
          }
        }}
      />
      <div className="border border-gray-200" />
      <Checkbox.CheckboxGroup
        options={options}
        value={checkedValues}
        onChange={onChange}
      />
    </div>
  )
}

export function WithCheckboxGroup() {
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

  const onChange = (checkboxGroup: string) => (args: string[]) =>
    action(`${checkboxGroup}-onChange`)(...args)

  return (
    <div className="space-y-6">
      <Checkbox.CheckboxGroup
        options={plainOptions}
        onChange={onChange('firstGroup')}
      />
      <Checkbox.CheckboxGroup
        options={options}
        onChange={onChange('secondGroup')}
      />
      <Checkbox.CheckboxGroup
        options={optionsWithDisabled}
        disabled
        onChange={onChange('thirdGroup')}
      />
    </div>
  )
}
