import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import Button from 'components/button'
import Modal from './modal'

export default { title: 'components/modal', component: Modal } as Meta

export function SimpleModal() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        label="Click To Open Modal"
        onClick={() => {
          setVisible(true)
        }}
      />
      <Modal
        visible={visible}
        onRequestClose={() => {
          setVisible(false)
        }}
        title="Default Modal"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida
        lorem nec velit egestas, quis varius mi condimentum. Nulla risus velit,
        imperdiet at pharetra a, eleifend eget massa. Donec porta purus eu ex
        hendrerit sagittis. Vestibulum eget mattis tellus, a dapibus nisi.
      </Modal>
    </>
  )
}

export function LargeContentModal() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        label="Click To Open Modal"
        onClick={() => {
          setVisible(true)
        }}
      />
      <Modal
        visible={visible}
        onRequestClose={() => {
          setVisible(false)
        }}
        title="Default Modal"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida
        lorem nec velit egestas, quis varius mi condimentum. Nulla risus velit,
        imperdiet at pharetra a, eleifend eget massa. Donec porta purus eu ex
        hendrerit sagittis. Vestibulum eget mattis tellus, a dapibus nisi. In
        auctor convallis ex, vel molestie nibh feugiat sed. Proin dictum
        accumsan sem, in auctor lorem. Ut interdum ultrices dapibus. Vivamus
        eget orci est. Curabitur vulputate suscipit elit sed rutrum. Aenean
        aliquam, lorem ut molestie egestas, dui urna ornare leo, sed euismod ex
        arcu vitae orci. In pellentesque sem nisi, id eleifend erat tincidunt
        ac. Vivamus eget erat eu justo fringilla consectetur non non orci. Fusce
        turpis leo, fringilla eu ullamcorper vitae, luctus et lectus. Etiam
        dictum ex dolor, ut faucibus orci ornare at. Sed diam massa, porta sit
        amet ultrices eu, suscipit ac nibh. Quisque ullamcorper diam vulputate
        diam congue placerat. Etiam hendrerit rutrum neque in vestibulum. Fusce
        dictum, sapien non laoreet pellentesque, est sapien posuere nisi, id
        aliquet mi lorem eu felis. Donec sit amet neque et tellus mollis
        suscipit. Nam molestie bibendum consequat. Fusce a fermentum tellus, sed
        aliquet neque. Curabitur blandit dui egestas nisi vestibulum, tempor
        blandit massa dapibus. Duis eget laoreet metus. Proin interdum urna
        erat, id commodo massa varius vitae. In hac habitasse platea dictumst.
        In auctor scelerisque maximus. Etiam enim justo, faucibus et neque sit
        amet, malesuada dignissim nunc. Curabitur ullamcorper egestas purus, nec
        imperdiet est viverra eu. Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Donec in varius dui. Sed
        egestas, metus eu vulputate mattis, metus dolor porta nulla, ut volutpat
        justo purus eu justo. Duis hendrerit, quam eu pellentesque viverra, enim
        erat mattis eros, ac suscipit dolor nulla quis risus. Quisque maximus
        sem et rutrum rutrum. Fusce efficitur a diam at suscipit. Aliquam vel
        nunc accumsan, aliquet lacus eget, imperdiet ante. Cras sagittis
        interdum efficitur. Curabitur turpis sapien, commodo in massa a, sodales
        luctus arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi gravida lorem nec velit egestas, quis varius mi condimentum. Nulla
        risus velit, imperdiet at pharetra a, eleifend eget massa. Donec porta
        purus eu ex hendrerit sagittis. Vestibulum eget mattis tellus, a dapibus
        nisi. In auctor convallis ex, vel molestie nibh feugiat sed. Proin
        dictum accumsan sem, in auctor lorem. Ut interdum ultrices dapibus.
        Vivamus eget orci est. Curabitur vulputate suscipit elit sed rutrum.
        Aenean aliquam, lorem ut molestie egestas, dui urna ornare leo, sed
        euismod ex arcu vitae orci. In pellentesque sem nisi, id eleifend erat
        tincidunt ac. Vivamus eget erat eu justo fringilla consectetur non non
        orci. Fusce turpis leo, fringilla eu ullamcorper vitae, luctus et
        lectus. Etiam dictum ex dolor, ut faucibus orci ornare at. Sed diam
        massa, porta sit amet ultrices eu, suscipit ac nibh. Quisque ullamcorper
        diam vulputate diam congue placerat. Etiam hendrerit rutrum neque in
        vestibulum. Fusce dictum, sapien non laoreet pellentesque, est sapien
        posuere nisi, id aliquet mi lorem eu felis. Donec sit amet neque et
        tellus mollis suscipit. Nam molestie bibendum consequat. Fusce a
        fermentum tellus, sed aliquet neque. Curabitur blandit dui egestas nisi
        vestibulum, tempor blandit massa dapibus. Duis eget laoreet metus. Proin
        interdum urna erat, id commodo massa varius vitae. In hac habitasse
        platea dictumst. In auctor scelerisque maximus. Etiam enim justo,
        faucibus et neque sit amet, malesuada dignissim nunc. Curabitur
        ullamcorper egestas purus, nec imperdiet est viverra eu. Orci varius
        natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Donec in varius dui. Sed egestas, metus eu vulputate mattis, metus
        dolor porta nulla, ut volutpat justo purus eu justo. Duis hendrerit,
        quam eu pellentesque viverra, enim erat mattis eros, ac suscipit dolor
        nulla quis risus. Quisque maximus sem et rutrum rutrum. Fusce efficitur
        a diam at suscipit. Aliquam vel nunc accumsan, aliquet lacus eget,
        imperdiet ante. Cras sagittis interdum efficitur. Curabitur turpis
        sapien, commodo in massa a, sodales luctus arcu.
      </Modal>
    </>
  )
}

export function NestedModal() {
  const [visible, setVisible] = useState(false)
  const [nestedModalVisible, setNestedModalVisible] = useState(false)

  return (
    <>
      <Button
        label="Click To Open Modal"
        onClick={() => {
          setVisible(true)
        }}
      />
      <Modal
        visible={visible}
        onRequestClose={() => {
          setVisible(false)
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
        <Button
          label="Click to open nested modal"
          onClick={() => {
            setNestedModalVisible(true)
          }}
        />
        <Modal
          title="Nested Modal"
          visible={nestedModalVisible}
          onRequestClose={() => {
            setNestedModalVisible(false)
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida
          lorem nec velit egestas, quis varius mi condimentum. Nulla risus
          velit, imperdiet at pharetra a, eleifend eget massa. Donec porta purus
          eu ex hendrerit sagittis. Vestibulum eget mattis tellus, a dapibus
          nisi.
        </Modal>
      </Modal>
    </>
  )
}
