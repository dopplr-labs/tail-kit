import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Checkbox } from './checkbox'

test('renders checkbox label correctly', () => {
  render(
    <Checkbox
      label="Checkbox label"
      onChange={(event) => {
        event?.target.checked
      }}
    />,
  )
  expect(screen.getByText('Checkbox label')).toBeInTheDocument()
})

test('onChange event of Checkbox working correctly', () => {
  const onChange = jest.fn((event) => event.target.checked)
  render(<Checkbox label="Checkbox label" onChange={onChange} />)
  fireEvent.click(screen.getByText('Checkbox label'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toBe(true)
})

test('renders checkbox icon container style correctly', () => {
  let checked = true
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild,
  ).toHaveClass('bg-blue-500')
})

test('renders indeterminate state correctly', () => {
  let checked: boolean | 'indeterminate' = 'indeterminate'
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild?.firstChild,
  ).toHaveClass('bg-blue-500')
})

test('renders error checkbox style correctly', () => {
  let checked = true
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      error={true}
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(screen.getByText('Checkbox label')).toHaveClass('text-red-500')
})

test('renders disabled checkbox correctly', () => {
  let checked = true
  render(
    <Checkbox
      label="Checkbox label"
      checked={checked}
      disabled
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(screen.getByText('Checkbox label').parentElement).toHaveClass(
    'text-gray-400',
  )
})

test('renders style of disabled checkbox correctly', () => {
  let checked = false
  render(
    <Checkbox
      label="Checkbox label"
      disabled
      checked={checked}
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild,
  ).toHaveClass('bg-gray-100')
})

test('renders checkbox without label correctly', () => {
  let checked = false
  render(
    <Checkbox
      checked={checked}
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(screen.queryByTestId('label')).toBe(null)
})

test('forward red to the checkbox', () => {
  const ref = createRef<HTMLInputElement>()
  let checked = false
  render(
    <Checkbox
      checked={checked}
      label="Checkbox label"
      ref={ref}
      onChange={(event) => {
        checked = event?.target.checked
      }}
    />,
  )
  expect(ref.current?.tagName).toBe('INPUT')
})

test('renders checkbox-group correctly with options as string[]', () => {
  render(<Checkbox.CheckboxGroup options={['Apple']} />)
  expect(screen.getByText('Apple')).toBeInTheDocument()
})

test('renders checkbox-group correctly with options as OptionType[]', () => {
  const options = [{ label: 'Apple', value: 'Apple' }]
  render(<Checkbox.CheckboxGroup options={options} />)
})

test('onChange event of checkbox-group working correctly when checked is set to true', () => {
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
  ]
  let checkedList: string[] = []
  const onChange = jest.fn((checkedValues) => {
    checkedList = checkedValues
    return checkedValues
  })
  render(
    <Checkbox.CheckboxGroup
      options={options}
      value={checkedList}
      onChange={onChange}
    />,
  )
  fireEvent.click(screen.getByText('Apple'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual(['Apple'])
})

test('onChange event of checkbox-group working correctly when checked is set to false', () => {
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
  ]
  let checkedList: string[] = ['Apple']
  const onChange = jest.fn((checkedValues) => {
    checkedList = checkedValues
    return checkedValues
  })
  render(
    <Checkbox.CheckboxGroup
      options={options}
      value={checkedList}
      onChange={onChange}
    />,
  )
  fireEvent.click(screen.getByText('Apple'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual([])
})
