import React, { useMemo, useState } from 'react'
// import { action } from '@storybook/addon-actions'
import { Meta } from '@storybook/react/types-6-0'
import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'

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
  const [checkedValues, setCheckedValues] = useState(['Pear'])

  function onChange(checkedList: string[]) {
    setCheckedValues(checkedList)
  }
  return (
    <div className="inline-block p-4 space-y-4 ">
      <Checkbox
        label="Check All"
        checked={
          checkedValues.length === plainOptions.length
            ? true
            : checkedValues.length === 0
            ? false
            : 'indeterminate'
        }
        onChange={() => {
          checkedValues.length === plainOptions.length
            ? setCheckedValues([])
            : setCheckedValues(plainOptions)
        }}
      />
      <div className="border border-gray-200" />
      <CheckboxGroup
        options={plainOptions}
        value={checkedValues}
        onChange={onChange}
      />
    </div>
  )
}

export function WithCheckboxGroup() {
  const plainOptions = ['Apple', 'Pear', 'Orange']
  const [firstValue, setFirstValue] = useState(['Apple', 'Orange'])
  const firstOnChange = useMemo(
    () => (checkedValues: string[]) => {
      // eslint-disable-next-line no-console
      console.log(checkedValues)
      setFirstValue(checkedValues)
    },
    [],
  )

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ]
  const [secondValue, setSecondValue] = useState(['Pear'])
  const secondOnChange = useMemo(
    () => (checkedValues: string[]) => {
      // eslint-disable-next-line no-console
      console.log(checkedValues)
      setSecondValue(checkedValues)
    },
    [],
  )

  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
  ]
  const [thirdValue, setThirdValue] = useState(['Apple'])
  const thirdOnChange = useMemo(
    () => (checkedValues: string[]) => {
      // eslint-disable-next-line no-console
      console.log(checkedValues)
      setThirdValue(checkedValues)
    },
    [],
  )
  return (
    <div className="space-y-6">
      <CheckboxGroup
        options={plainOptions}
        value={firstValue}
        onChange={firstOnChange}
      />
      <CheckboxGroup
        options={options}
        value={secondValue}
        onChange={secondOnChange}
      />
      <CheckboxGroup
        options={optionsWithDisabled}
        value={thirdValue}
        disabled
        onChange={thirdOnChange}
      />
    </div>
  )
}
