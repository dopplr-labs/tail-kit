import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { Checkbox } from './checkbox'

export default {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
} as Meta

export function DefaultCheckbox() {
  return <Checkbox value="checked" />
}

export function CheckboxWithLabel() {
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
      onChange={() => {
        setTermsAgreed((prevState) => !prevState)
      }}
      label="I agree to the terms and conditions"
      error={!termsAgreed}
    />
  )
}
