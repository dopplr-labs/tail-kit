import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import Menu from './menu'

export default {
  title: 'components/menu',
  component: Menu,
} as Meta

export function DropdownMenu() {
  return (
    <Menu
      items={[
        {
          label: 'Share Blog',
          icon: (
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 share"
            >
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          ),
        },
        {
          label: 'Edit Blog',
          icon: (
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 pencil"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          ),
        },
        {
          label: 'Delete Blog',
          icon: (
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 trash"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
      ]}
    >
      <Button
        icon={
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 chevron-down"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        }
      />
    </Menu>
  )
}
