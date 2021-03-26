import React from 'react'
import { render, screen } from '@testing-library/react'
import Input from 'components/input'
import { Form } from './form'

test('render form correctly', () => {
  render(
    <Form>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
    </Form>,
  )
  expect(screen.getByText('Email :')).toBeInTheDocument()
})
