import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import range from 'utils/range'
import { Tabs } from './tabs'

test('renders tab titles correctly', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
    />,
  )

  range(4).map((val) => {
    expect(screen.getByText(`Tab ${val + 1}`)).toBeInTheDocument()
  })
})

test('renders tab icons correctly', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        icon: <div data-testid={`tab-icon-${val + 1}`} />,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
    />,
  )

  range(4).map((val) => {
    expect(screen.getByTestId(`tab-icon-${val + 1}`)).toBeInTheDocument()
  })
})

test('renders first tab by default', () => {
  render(
    <Tabs
      tabs={[
        { title: 'Tab 1', key: 'tab-1', content: <div>Tab Content 1</div> },
      ]}
    />,
  )

  expect(screen.getByText('Tab Content 1')).toBeInTheDocument()
})

test('renders correct tab content', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
    />,
  )

  fireEvent.click(screen.getByText('Tab 2'))

  expect(screen.getByText('Tab Content 2')).toBeInTheDocument()
})

test('renders tab at top by default', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
    />,
  )

  expect(screen.getByTestId('tabs-container').classList).toContain('flex-col')
})

test('renders tab at bottom correctly', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
      position={Tabs.TabPosition.bottom}
    />,
  )

  expect(screen.getByTestId('tabs-container').classList).toContain(
    'flex-col-reverse',
  )
})

test('renders tab at left correctly', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
      position={Tabs.TabPosition.left}
    />,
  )

  expect(screen.getByTestId('tabs-container').classList).toContain('flex-row')
})

test('renders tab at right correctly', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
      position={Tabs.TabPosition.right}
    />,
  )

  expect(screen.getByTestId('tabs-container').classList).toContain(
    'flex-row-reverse',
  )
})

test('renders active tab with underline correctly', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
      position={Tabs.TabPosition.right}
    />,
  )

  fireEvent.click(screen.getByText('Tab 3'))

  expect(screen.getAllByRole('tab')[2].classList).toContain('border-blue-500')
})

test('render active tab in pill correctly', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
      position={Tabs.TabPosition.right}
      type={Tabs.TabType.pill}
    />,
  )

  fireEvent.click(screen.getByText('Tab 3'))

  expect(screen.getAllByRole('tab')[2].classList).toContain('bg-blue-50')
})

test('renders extra content correctly', () => {
  render(
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: <div>Tab Content {val + 1}</div>,
      }))}
      extraContent={<div data-testid="tab-extra-content" />}
    />,
  )

  expect(screen.getByTestId('tab-extra-content')).toBeInTheDocument()
})
