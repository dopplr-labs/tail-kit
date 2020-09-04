import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import { PencilAltSolid } from 'components/icons'
import { Tour } from './tour'

export default {
  title: 'Navigation/Product Tour',
  component: Tour,
} as Meta

export function DefaultTour() {
  return (
    <>
      <div className="w-full h-40 overflow-auto">
        <div className="flex flex-col items-start justify-between h-80">
          <Button
            label="Create Account"
            id="create-account"
            className="bg-white"
          />
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
            content:
              'Create your account by entering your email and password. Enjoy the world of awesome blogs',
          },
          {
            target: '#write-blog',
            content: (
              <div>
                <div className="mb-3">Write your blog like John Groover</div>
                <iframe
                  className="w-full"
                  src="https://www.youtube.com/embed/co-VbaDl-SI?autoplay=1&mute=1&controls=0&showinfo=0"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            ),
            title: 'Write Your First Blog',
          },
        ]}
      />
    </>
  )
}
