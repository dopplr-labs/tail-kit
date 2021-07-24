import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from 'components/input'
import Button from 'components/button'
import { CheckboxGroup } from 'components/checkbox/checkbox-group'
import { Checkbox } from 'components/checkbox/checkbox'
import Form from './index'

test('render form correctly', () => {
  render(
    <Form defaultValues={{ email: '' }}>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
    </Form>,
  )
  expect(screen.getByText('Email :')).toBeInTheDocument()
})

test('inline layout form renders correctly', () => {
  render(
    <Form layout={Form.Layout.INLINE} defaultValues={{ email: '' }}>
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
    <Form layout={Form.Layout.VERTICAL} defaultValues={{ email: '' }}>
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
    <Form onSubmit={onSubmit} defaultValues={{ email: '' }}>
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

test('onChange of input elements works correctly with form', () => {
  let value = ['hello']
  const onChange = jest.fn((checkedValues) => {
    value = checkedValues
    return checkedValues
  })
  render(
    <Form defaultValues={{ checkbox: ['hello'] }}>
      <Form.Item name="checkbox">
        <CheckboxGroup
          options={['hello', 'world']}
          value={value}
          onChange={onChange}
        />
      </Form.Item>
    </Form>,
  )
  fireEvent.click(screen.getByText('world'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual(['hello', 'world'])
})

test('checkbox works correctly in form', async () => {
  const onSubmit = jest.fn((data) => data)
  render(
    <Form onSubmit={onSubmit} defaultValues={{ checkbox: false }}>
      <Form.Item name="checkbox" valuePropName="checked">
        <Checkbox label="Remember me" />
      </Form.Item>
      <Button label="Submit" />
    </Form>,
  )
  fireEvent.click(screen.getByText('Remember me'))
  fireEvent.click(screen.getByText('Submit'))
  await waitFor(() => {
    expect(onSubmit).toBeCalled()
  })
  expect(onSubmit.mock.results[0].value).toStrictEqual({ checkbox: true })
})

test('children as function works correctly with form', async () => {
  render(
    <Form defaultValues={{ email: '' }}>
      {({ isDirty, isValid }: { isDirty: boolean; isValid: boolean }) => (
        <>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>
          <Button
            label="Submit"
            buttonType={Button.ButtonType.primary}
            disabled={!isDirty || !isValid}
          />
        </>
      )}
    </Form>,
  )
  expect(screen.getByText('Submit').parentElement).toHaveAttribute('disabled')
  userEvent.type(screen.getByRole('textbox'), 'test@example.com')
  await waitFor(() => {
    expect(screen.getByText('Submit').parentElement).not.toHaveAttribute(
      'disabled',
    )
  })
})

test('Layouting works correctly for form', () => {
  const tailLayout = {
    wrapperCol: { span: 2, offset: 2 },
    labelCol: { span: 2, offset: 1 },
  }
  const formLayout = {
    wrapperCol: { span: 2, offset: 2 },
    labelCol: { span: 1, offset: 1 },
  }
  render(
    <Form
      {...formLayout}
      defaultValues={{ rememberMe: true, email: '', password: '' }}
    >
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input />
      </Form.Item>
      <Form.Item name="rememberMe" {...tailLayout} valuePropName="checked">
        <Checkbox label="Remember Me" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button label="Submit" type="submit" />
      </Form.Item>
    </Form>,
  )
  expect(screen.getByText('Submit').parentElement?.parentElement).toHaveClass(
    'lg:col-start-2',
  )
})

test('using form-item without parent component should throw error', () => {
  const renderItem = () => {
    render(
      <Form.Item name="email">
        <Input />
      </Form.Item>,
    )
  }
  expect(renderItem).toThrow(
    'Form.Item component should be used within Form component',
  )
})

test('extra content renders correctly in form item', () => {
  render(
    <Form defaultValues={{ email: '' }}>
      <Form.Item
        name="email"
        label="Email"
        extra={<span>Enter your business email address</span>}
      >
        <Input />
      </Form.Item>
    </Form>,
  )
  expect(
    screen.getByText('Enter your business email address'),
  ).toBeInTheDocument()
})

test('required mark renders correctly for required fields', () => {
  render(
    <Form defaultValues={{ email: '' }}>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please enter your email address' }]}
      >
        <Input />
      </Form.Item>
    </Form>,
  )
  expect(screen.getByText('*')).toBeInTheDocument()
})
