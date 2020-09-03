import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import { PencilAltSolid } from 'components/icons'
import { Tour } from './tour'

export default {
  title: 'components/tour',
  component: Tour,
} as Meta

export function DefaultTour() {
  return (
    <>
      <div className="w-full h-80">
        <div className="flex items-center justify-between">
          <Button label="Create Account" id="create-account" />
          <Button
            label="Write Blog"
            icon={<PencilAltSolid />}
            buttonType={Button.ButtonType.primary}
            id="write-blog"
          />
        </div>
      </div>
      <Tour
        steps={[
          {
            target: '#create-account',
            title: 'Create Your Account',
          },
          {
            target: '#write-blog',
            title: 'Write Your First Blog',
          },
        ]}
      />
    </>
  )
}
