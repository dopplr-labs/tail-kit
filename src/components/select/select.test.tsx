import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BeakerOutline,
  CalculatorOutline,
  ChipOutline,
  ClipboardListOutline,
} from 'components/icons'
import { Select } from './select'
import { SearchSelect } from './search-select'
import { MultiSelect } from './multi-select'

const plainOptions = [
  'Black Widow',
  'Hulk',
  'Spiderman',
  'Captain America',
  'Doctor Strange',
  'Hawk Eye',
]
const options = [
  { label: 'Beaker', value: 'beaker', icon: <BeakerOutline /> },
  { label: 'Calculator', value: 'calculator', icon: <CalculatorOutline /> },
  { label: 'Chip', value: 'chip', icon: <ChipOutline /> },
  {
    label: 'Clipboard List',
    value: 'clipboard-list',
    icon: <ClipboardListOutline />,
  },
]

test('renders Select component correctly', () => {
  render(<Select options={plainOptions} placeholder="Select Avenger" />)
  expect(screen.getByText('Select Avenger')).toBeInTheDocument()
})

test('onChange event of Select component working correctly', () => {
  const onChange = jest.fn(({ selectedItem }) => selectedItem)
  render(
    <Select options={options} placeholder="Select SVG" onChange={onChange} />,
  )
  fireEvent.click(screen.getByText('Select SVG'))
  fireEvent.click(screen.getByText('Beaker'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual({
    icon: <BeakerOutline />,
    label: 'Beaker',
    value: 'beaker',
  })
})

// This test is not working due to: <button> cannot appear as a descendant of <button>
// Find a way to fix this

test('Clear button of Select component working correctly', () => {
  const onChange = jest.fn(({ selectedItem }) => selectedItem)
  render(
    <Select
      options={plainOptions}
      allowClear
      defaultValue="Hawk Eye"
      onChange={onChange}
    />,
  )
  fireEvent.click(screen.getByTestId('clear-button'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual(undefined)
})

test('selected item style in Select component renders correctly', () => {
  render(<Select options={plainOptions} defaultValue="Hawk Eye" />)
  fireEvent.click(screen.getByText('Hawk Eye'))
  expect(
    screen.getAllByText('Hawk Eye')[1].parentElement?.parentElement,
  ).toHaveClass('font-semibold')
})

test('Disabled prop of Select component working correctly', () => {
  render(
    <Select options={plainOptions} disabled placeholder="Select Avenger" />,
  )
  expect(screen.getByText('Select Avenger').parentElement).toHaveClass(
    'bg-gray-100',
  )
})

// Tests for SearchSelect component
test('SearchSelect component renders correctly', () => {
  render(<SearchSelect options={plainOptions} placeholder="Search Avenger" />)
  expect(screen.getByPlaceholderText('Search Avenger')).toBeInTheDocument()
})

test('onChange event of SearchSelect component working correctly', () => {
  const onChange = jest.fn(({ selectedItem }) => selectedItem)
  render(
    <SearchSelect
      options={options}
      onChange={onChange}
      placeholder="Search SVG"
    />,
  )
  fireEvent.focus(screen.getByPlaceholderText('Search SVG'))
  fireEvent.click(screen.getByText('Beaker'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual({
    icon: <BeakerOutline />,
    label: 'Beaker',
    value: 'beaker',
  })
})

test('Clear button of SearchSelect component working correctly', () => {
  const onChange = jest.fn(({ selectedItem }) => selectedItem)
  render(
    <SearchSelect
      options={plainOptions}
      defaultValue="Hawk Eye"
      allowClear
      onChange={onChange}
    />,
  )
  expect(screen.getByDisplayValue('Hawk Eye')).toBeInTheDocument()
  fireEvent.click(screen.getByTestId('clear-button'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual(undefined)
})

test('Disabled prop of SearchSelect component working correctly', () => {
  render(
    <SearchSelect
      options={plainOptions}
      disabled
      placeholder="Search Avenger"
    />,
  )
  expect(screen.getByPlaceholderText('Search Avenger')).toHaveClass(
    'bg-gray-100',
  )
})

test('Highlighed item in SearchSelect component renders correctly', () => {
  render(<SearchSelect options={plainOptions} defaultValue="Hawk Eye" />)
  fireEvent.focus(screen.getByDisplayValue('Hawk Eye'))
  expect(screen.getByText('Hawk Eye').parentElement?.parentElement).toHaveClass(
    'bg-blue-600',
  )
})

test('Filter in SearchSelect component working correctly', () => {
  render(<SearchSelect options={plainOptions} placeholder="Search Avenger" />)
  userEvent.type(screen.getByPlaceholderText('Search Avenger'), 'doc')
  expect(screen.getByText('Doctor Strange')).toBeInTheDocument()
})

// Tests for MultiSelect component
test('MultiSelect component renders correctly', () => {
  render(<MultiSelect options={plainOptions} placeholder="Select Avengers" />)
  expect(screen.getByPlaceholderText('Select Avengers')).toBeInTheDocument()
})

test('Clear button of MultiSelect component works correctly', () => {
  const onChange = jest.fn(({ selectedItem }) => selectedItem)
  render(
    <MultiSelect
      options={options}
      allowClear
      defaultValue={['Hulk', 'Hawk Eye']}
      onChange={onChange}
    />,
  )
  fireEvent.click(screen.getByTestId('clear-button'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual([])
})

test('Dropdown of MultiSelect component opens correctly on input focus', () => {
  render(<MultiSelect placeholder="Select Avengers" options={plainOptions} />)
  fireEvent.focus(screen.getByPlaceholderText('Select Avengers'))
  expect(screen.getByText('Black Widow')).toBeInTheDocument()
})

test('Unselection through chips of MultiSelect component working correctly', () => {
  const onChange = jest.fn(({ selectedItem }) => selectedItem)
  render(
    <MultiSelect
      options={plainOptions}
      defaultValue={['Hulk']}
      onChange={onChange}
    />,
  )
  expect(screen.getByText('Hulk')).toBeInTheDocument()
  fireEvent.click(screen.getByTestId('chip-button'))
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual([])
})

test('Item selection from dropdown of MultiSelect component working correctly', () => {
  const onChange = jest.fn(({ selectedItem }) => selectedItem)
  render(
    <MultiSelect
      options={plainOptions}
      placeholder="Select Avengers"
      onChange={onChange}
    />,
  )
  fireEvent.focus(screen.getByPlaceholderText('Select Avengers'))
  fireEvent.click(screen.getByText('Spiderman'))
  expect(screen.getAllByText('Spiderman')[0]).toHaveClass('bg-blue-100')
  expect(onChange).toBeCalled()
  expect(onChange.mock.results[0].value).toStrictEqual(['Spiderman'])
})

test('Filter in MultiSelect component working correctly', () => {
  render(<MultiSelect options={plainOptions} placeholder="Select Avengers" />)
  userEvent.type(screen.getByPlaceholderText('Select Avengers'), 'bla')
  expect(screen.getByText('Black Widow')).toBeInTheDocument()
})

test('Disabled prop of MultiSelect component working correctly', () => {
  render(
    <MultiSelect
      options={plainOptions}
      placeholder="Select Avengers"
      disabled
    />,
  )
  expect(screen.getByPlaceholderText('Select Avengers')).toHaveClass(
    'bg-gray-100',
  )
})

test('Chips in MultiSelect component renders correctly with disabled prop', () => {
  render(
    <MultiSelect options={plainOptions} disabled defaultValue={['Hulk']} />,
  )
  expect(screen.getByText('Hulk')).toHaveClass('bg-gray-200')
})
