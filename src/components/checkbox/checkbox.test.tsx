import React, { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'

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

test('toggles checked state correctly to false on click', () => {
  const onChange = jest.fn((event) => event.target.checked)
  render(<Checkbox label="Checkbox label" onChange={onChange} />)
  fireEvent.click(screen.getByText('Checkbox label'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toBe(true)
})

test('toggles checkbox correctly when initiated with indeterminate', () => {
  const onChange = jest.fn((event) => event.target.checked)
  render(
    <Checkbox
      label="Checkbox label"
      checked="indeterminate"
      onChange={onChange}
    />,
  )
  fireEvent.click(screen.getByText('Checkbox label'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toBe(false)
})

test('renders checkbox icon container style correctly', () => {
  render(<Checkbox label="Checkbox label" checked readOnly />)
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild,
  ).toHaveClass('bg-blue-500')
})

test('renders indeterminate state correctly', () => {
  const checked: boolean | 'indeterminate' = 'indeterminate'
  render(<Checkbox label="Checkbox label" checked={checked} readOnly />)
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild?.firstChild,
  ).toHaveClass('bg-blue-500')
})

test('renders error checkbox style correctly', () => {
  render(<Checkbox label="Checkbox label" checked error={true} readOnly />)
  expect(screen.getByText('Checkbox label')).toHaveClass('text-red-500')
})

test('renders disabled checkbox correctly', () => {
  render(<Checkbox label="Checkbox label" checked disabled />)
  expect(screen.getByText('Checkbox label').parentElement).toHaveClass(
    'text-gray-400',
  )
})

test('renders style of disabled checkbox correctly', () => {
  render(<Checkbox label="Checkbox label" disabled />)
  expect(
    screen.getByText('Checkbox label').parentElement?.firstChild,
  ).toHaveClass('bg-gray-100')
})

test('renders checkbox without label correctly', () => {
  render(<Checkbox readOnly />)
  expect(screen.queryByTestId('label')).toBe(null)
})

test('forward ref to the checkbox', () => {
  const ref = createRef<HTMLInputElement>()
  render(<Checkbox label="Checkbox label" ref={ref} readOnly />)
  expect(ref.current?.tagName).toBe('INPUT')
})

test('renders checkbox-group correctly with options as string[]', () => {
  render(<CheckboxGroup options={['Apple']} />)
  expect(screen.getByText('Apple')).toBeInTheDocument()
})

test('renders checkbox-group correctly with options as OptionType[]', () => {
  const options = [{ label: 'Apple', value: 'Apple' }]
  render(<CheckboxGroup options={options} />)
  expect(screen.getByText('Apple')).toBeInTheDocument()
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
    <CheckboxGroup options={options} value={checkedList} onChange={onChange} />,
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
    <CheckboxGroup options={options} value={checkedList} onChange={onChange} />,
  )
  fireEvent.click(screen.getByText('Apple'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual([])
})
