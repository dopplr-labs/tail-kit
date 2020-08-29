import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import {
  ShareOutline,
  PencilAltOutline,
  TrashOutline,
  ChevronDownOutline,
} from 'components/icons'
import { Menu } from './menu'

export default {
  title: 'components/menu',
  component: Menu,
} as Meta

export function DropdownMenu() {
  return (
    <div className="h-80">
      <Menu
        items={[
          {
            label: 'Share Blog',
            icon: <ShareOutline className="w-5 h-5" />,
          },
          {
            label: 'Edit Blog',
            icon: <PencilAltOutline className="w-5 h-5" />,
          },
          {
            label: 'Delete Blog',
            icon: <TrashOutline className="w-5 h-5" />,
          },
        ]}
      >
        <Button icon={<ChevronDownOutline />} />
      </Menu>
    </div>
  )
}
