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
    <Menu trigger={<Button icon={<ChevronDownOutline />} />}>
      <Menu.MenuItem label="Share Blog" icon={<ShareOutline />} />
      <Menu.MenuItem label="Edit Blog" icon={<PencilAltOutline />} />
      <Menu.MenuDivider />
      <Menu.MenuItem label="Delete Blog" icon={<TrashOutline />} />
    </Menu>
  )
}
