import React from 'react'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { Select } from './select'

const portalParent = document.createElement('div')
portalParent.id = 'portal-parent'

beforeEach(() => {
  document.body.appendChild(portalParent)
})

afterEach(() => {
  document.body.removeChild(portalParent)
})

test('renders placeholder correctly', () => {
  const selectPlaceholder = 'Select Option'
  render(
    <Select
      placeholder={selectPlaceholder}
      options={[]}
      portalParent={portalParent}
    />,
  )
  expect(screen.getByText(selectPlaceholder)).toBeInTheDocument()
})

test('toggle menu on click', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

  fireEvent.click(screen.getByText(selectPlaceholder))

  expect(screen.getByRole('listbox')).toBeInTheDocument()
  options.forEach((option) => {
    expect(screen.getByText(option)).toBeInTheDocument()
  })

  fireEvent.click(screen.getByText(selectPlaceholder))

  // use waitFor because we are changing the state of the select component
  // and we have to wait till the changes are updated
  // For more information
  // https://github.com/threepointone/react-act-examples/blob/master/sync.md
  // https://testing-library.com/docs/guide-disappearance#waiting-for-disappearance
  await waitForElementToBeRemoved(() => screen.getByRole('listbox'))
})

test('closes the menu on selecting an option', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))
  fireEvent.click(screen.getByText(options[0]))

  await waitForElementToBeRemoved(() => screen.getByRole('listbox'))
})

test('selects the option on click', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))
  fireEvent.click(screen.getByText(options[0]))

  await waitFor(() => {
    expect(screen.getByRole('button').textContent).toBe(options[0])
  })
})

test('resets the selected option on click on the clear all button', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
      allowClear
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))
  fireEvent.click(screen.getByText(options[0]))
  fireEvent.click(screen.getByTestId('clear-all'))

  await waitFor(() => {
    // when the selected item is clear, the placeholder is rendered again
    expect(screen.getByText(selectPlaceholder)).toBeInTheDocument()
  })
})

test('renders selected option icon correctly', async () => {
  const selectPlaceholder = 'Select Option'
  const options = [
    {
      value: 'option-1',
      label: 'Option 1',
      icon: <div data-testid="icon-1" />,
    },
    {
      value: 'option-2',
      label: 'Option 2',
      icon: <div data-testid="icon-2" />,
    },
    {
      value: 'option-3',
      label: 'Option 3',
      icon: <div data-testid="icon-3" />,
    },
  ]
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))
  fireEvent.click(screen.getByText(options[0].label))

  await waitFor(() => {
    expect(
      // when the option with icon is selected, it would be present inside the
      // button which toggles the select menu
      screen.queryByRole('button')?.querySelector('[data-testid="icon-1"]'),
    ).toBeTruthy()
  })
})

test('opens options menu on arrow down keypress on the button', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

  fireEvent.focus(screen.getByRole('button'))
  fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowDown' })

  expect(screen.getByRole('listbox')).toBeInTheDocument()
  options.forEach((option) => {
    expect(screen.getByText(option)).toBeInTheDocument()
  })
})

test('opens options menu on arrow up keypress on the button', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

  fireEvent.click(screen.getByText(selectPlaceholder))
  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' })

  await waitForElementToBeRemoved(() => screen.getByRole('listbox'))
})

test('closes options menu on escape press if the menu is open', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.focus(screen.getByRole('button'))
  fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowUp' })

  expect(screen.getByRole('listbox')).toBeInTheDocument()
  options.forEach((option) => {
    expect(screen.getByText(option)).toBeInTheDocument()
  })
})

test('navigate options by keyboard', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))
  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })

  // the second element should be selected after pressing the downkey as the first element would
  // be selected by default
  await waitFor(() => {
    expect(
      screen.queryAllByRole('option')[1].classList.contains('bg-blue-500'),
    ).toBeTruthy()
    expect(
      screen.queryAllByRole('option')[1].classList.contains('text-white'),
    ).toBeTruthy()
  })

  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowUp' })
  // the first element should be selected after pressing the up key
  await waitFor(() => {
    expect(
      screen.queryAllByRole('option')[0].classList.contains('bg-blue-500'),
    ).toBeTruthy()
    expect(
      screen.queryAllByRole('option')[0].classList.contains('text-white'),
    ).toBeTruthy()
  })
})

test('navigates circularly in the options list correctly', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))

  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })
  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })
  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })

  // the first element should be selected after pressing the downkey for three times
  // 1 keydown -> second element
  // 2 keydown -> third element
  // 3 keydown -> first element (circular navigation)
  await waitFor(() => {
    expect(
      screen.queryAllByRole('option')[0].classList.contains('bg-blue-500'),
    ).toBeTruthy()
    expect(
      screen.queryAllByRole('option')[0].classList.contains('text-white'),
    ).toBeTruthy()
  })
})

test('highlights options on mouse hover correctly', () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))
  fireEvent.mouseOver(screen.queryAllByRole('option')[2])

  // hovering on the third option should hightlight it
  expect(
    screen.queryAllByRole('option')[2].classList.contains('bg-blue-500'),
  ).toBeTruthy()
  expect(
    screen.queryAllByRole('option')[2].classList.contains('text-white'),
  ).toBeTruthy()
})

test('selects options correctly using keyboard', async () => {
  const selectPlaceholder = 'Select Option'
  const options = ['Option 1', 'Option 2', 'Option 3']
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))
  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })
  // the second element should be selected after pressing the downkey as the first element would
  // be selected by default
  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Enter' })
  await waitFor(() => {
    expect(screen.getByRole('button').textContent).toBe('Option 2')
  })
})

test('navigates correctly in case of disabled options', async () => {
  const selectPlaceholder = 'Select Option'
  const options = [
    { value: 'option-1', label: 'Option 1', disabled: true },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3', disabled: true },
    { value: 'option-4', label: 'Option 4' },
    { value: 'option-5', label: 'Option 5', disabled: true },
  ]
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))
  // as the first option is disabled by default the first option should be highlighted
  expect(
    screen.queryAllByRole('option')[1].classList.contains('bg-blue-500'),
  ).toBeTruthy()
  expect(
    screen.queryAllByRole('option')[1].classList.contains('text-white'),
  ).toBeTruthy()

  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })
  // as the third option is also disabled, it would move to the fouth option
  await waitFor(() => {
    expect(
      screen.queryAllByRole('option')[3].classList.contains('bg-blue-500'),
    ).toBeTruthy()
    expect(
      screen.queryAllByRole('option')[3].classList.contains('text-white'),
    ).toBeTruthy()
  })

  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' })
  // it would circulary move back to the top, as the 5th option is also disabled,
  // but as the first option is also disabled, it should highlight the 2nd option
  await waitFor(() => {
    expect(
      screen.queryAllByRole('option')[1].classList.contains('bg-blue-500'),
    ).toBeTruthy()
    expect(
      screen.queryAllByRole('option')[1].classList.contains('text-white'),
    ).toBeTruthy()
  })

  fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowUp' })
  // it would circulary move back to the bottom, as the 1st option is also disabled,
  // but as the fiftch option is also disabled, it should highlight the 4th option
  await waitFor(() => {
    expect(
      screen.queryAllByRole('option')[3].classList.contains('bg-blue-500'),
    ).toBeTruthy()
    expect(
      screen.queryAllByRole('option')[3].classList.contains('text-white'),
    ).toBeTruthy()
  })
})

test("doesn't highlight disabled options", async () => {
  const selectPlaceholder = 'Select Option'
  const options = [
    { value: 'option-1', label: 'Option 1', disabled: true },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3', disabled: true },
    { value: 'option-4', label: 'Option 4' },
    { value: 'option-5', label: 'Option 5', disabled: true },
  ]
  render(
    <Select
      placeholder={selectPlaceholder}
      options={options}
      portalParent={portalParent}
    />,
  )

  fireEvent.click(screen.getByText(selectPlaceholder))
  fireEvent.mouseOver(screen.queryAllByRole('option')[2])

  // hovering on the third option shouldn't hightlight it as it a disabled option
  expect(
    screen.queryAllByRole('option')[2].classList.contains('bg-blue-500'),
  ).toBeFalsy()
  expect(
    screen.queryAllByRole('option')[2].classList.contains('text-white'),
  ).toBeFalsy()
})
