import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import {
  ShareOutline,
  PencilAltOutline,
  TrashOutline,
  ChevronDownOutline,
  ChevronUpOutline,
} from 'components/icons'
import Modal from 'components/modal'
import { Menu } from './menu'
import './menu.stories.css'

export default {
  title: 'components/menu',
  component: Menu,
} as Meta

export function DropdownMenu() {
  const menuContent = (
    <>
      <Menu.MenuItem label="Share Blog" icon={<ShareOutline />} />
      <Menu.MenuItem label="Edit Blog" icon={<PencilAltOutline />} />
      <Menu.MenuDivider />
      <Menu.MenuItem label="Delete Blog" icon={<TrashOutline />} />
    </>
  )

  return (
    <div className="relative w-full h-80 all-menus-container">
      <div className="absolute top-0 left-0">
        <Menu trigger={<Button icon={<ChevronDownOutline />} />}>
          {menuContent}
        </Menu>
      </div>
      <div className="absolute bottom-0 left-0">
        <Menu trigger={<Button icon={<ChevronUpOutline />} />}>
          {menuContent}
        </Menu>
      </div>
      <div className="absolute top-0 right-0">
        <Menu trigger={<Button icon={<ChevronDownOutline />} />}>
          {menuContent}
        </Menu>
      </div>
      <div className="absolute bottom-0 right-0">
        <Menu trigger={<Button icon={<ChevronUpOutline />} />}>
          {menuContent}
        </Menu>
      </div>
    </div>
  )
}

export function MenuWithinAModal() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <Button
        label="Click To Open Modal"
        onClick={() => {
          setModalVisible(true)
        }}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
        title="Default Modal"
      >
        <div className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida
          lorem nec velit egestas, quis varius mi condimentum. Nulla risus
          velit, imperdiet at pharetra a, eleifend eget massa. Donec porta purus
          eu ex hendrerit sagittis. Vestibulum eget mattis tellus, a dapibus
          nisi.
        </div>
        <Menu
          trigger={<Button icon={<ChevronDownOutline />} label="Show Menu" />}
        >
          <Menu.MenuItem label="Share Blog" icon={<ShareOutline />} />
          <Menu.MenuItem label="Edit Blog" icon={<PencilAltOutline />} />
          <Menu.MenuDivider />
          <Menu.MenuItem label="Delete Blog" icon={<TrashOutline />} />
        </Menu>
      </Modal>
    </>
  )
}
