import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Input from 'components/input'
import Button from 'components/button'
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

test('inline layout form renders correctly', () => {
  render(
    <Form layout={Form.Layout.INLINE}>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
    </Form>,
  )
  expect(screen.getByText('Email :').parentElement).toHaveClass(
    'flex items-center',
  )
})

test('vertical layout form renders correctly', () => {
  render(
    <Form layout={Form.Layout.VERTICAL}>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
    </Form>,
  )
  expect(screen.getByText('Email').parentElement).toHaveClass('flex flex-col')
})

test('error message renders correctly', async () => {
  const onSubmit = jest.fn((data) => data)
  render(
    <Form onSubmit={onSubmit}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please enter your email address' }]}
      >
        <Input />
      </Form.Item>
      <Button type="submit" label="Submit" />
    </Form>,
  )
  fireEvent.click(screen.getByText('Submit'))
  await waitFor(() => {
    expect(
      screen.getByText('Please enter your email address'),
    ).toBeInTheDocument()
  })
})
