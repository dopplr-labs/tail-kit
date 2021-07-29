import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import {
  HiCreditCard,
  HiOfficeBuilding,
  HiUserCircle,
  HiUsers,
} from 'react-icons/hi'
import Select from 'components/select'
import range from 'utils/range'
import { Tabs } from './tabs'

export default {
  component: Tabs,
  title: 'Navigation/Tabs',
} as Meta

export function DefaultTabs() {
  return (
    <Tabs
      tabs={range(4).map((val) => ({
        title: `Tab ${val + 1}`,
        key: `tab-${val + 1}`,
        content: (
          <div className="text-sm text-gray-700">Tab Content {val + 1}</div>
        ),
      }))}
    />
  )
}

const tabsList = [
  {
    title: 'My Account',
    content: 'Account Details',
    icon: <HiUserCircle className="w-6 h-6" />,
    key: 'my-account',
  },
  {
    title: 'Company',
    content: 'Company Details',
    key: 'company',
    icon: <HiOfficeBuilding className="w-6 h-6" />,
  },
  {
    title: 'Team Members',
    content: 'Team Members Details',
    key: 'team-members',
    icon: <HiUsers className="w-6 h-6" />,
  },
  {
    title: 'Billing',
    content: 'Billing Details',
    key: 'billing',
    icon: <HiCreditCard className="w-6 h-6" />,
  },
]

const tabs = tabsList.map((tab) => ({
  key: tab.key,
  title: tab.title,
  icon: tab.icon,
  content: (
    <>
      <h1 className="text-base font-semibold text-gray-800">{tab.title}</h1>
      <div className="text-sm text-gray-700">{tab.content}</div>
    </>
  ),
}))

const TabChanger = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string | undefined
  setActiveTab: React.Dispatch<React.SetStateAction<string | undefined>>
}) => (
  <Select
    value={activeTab}
    onChange={setActiveTab}
    className="w-48"
    options={tabs.map((tab) => ({
      label: tab.title,
      value: tab.key,
      icon: tab.icon,
    }))}
    placeholder="Select Tab"
  />
)

export function TabsWithIcon() {
  return <Tabs tabs={tabs} />
}

export function TabsWithExtraContent() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      tab={activeTab}
      onTabChange={setActiveTab}
      extraContent={
        <TabChanger activeTab={activeTab} setActiveTab={setActiveTab} />
      }
      tabs={tabs}
    />
  )
}

export function TabsInPills() {
  return <Tabs type={Tabs.TabType.pill} tabs={tabs} />
}

export function TabsWithIconInPills() {
  return <Tabs type={Tabs.TabType.pill} tabs={tabs} />
}

export function TabsInPillsWithExtraContent() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      type={Tabs.TabType.pill}
      tab={activeTab}
      onTabChange={setActiveTab}
      extraContent={
        <TabChanger activeTab={activeTab} setActiveTab={setActiveTab} />
      }
      tabs={tabs}
    />
  )
}

export function TabsAtBottom() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      position={Tabs.TabPosition.bottom}
      tab={activeTab}
      onTabChange={setActiveTab}
      extraContent={
        <TabChanger activeTab={activeTab} setActiveTab={setActiveTab} />
      }
      tabs={tabs}
    />
  )
}

export function TabsInPillsAtBottom() {
  return (
    <Tabs
      position={Tabs.TabPosition.bottom}
      type={Tabs.TabType.pill}
      tabs={tabs}
    />
  )
}

export function TabsAtLeft() {
  return <Tabs position={Tabs.TabPosition.left} tabs={tabs} />
}

export function TabsInPillsAtLeft() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      className="h-full"
      tab={activeTab}
      onTabChange={setActiveTab}
      position={Tabs.TabPosition.left}
      type={Tabs.TabType.pill}
      extraContent={
        <TabChanger activeTab={activeTab} setActiveTab={setActiveTab} />
      }
      tabs={tabs}
    />
  )
}

export function TabsAtRight() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      className="h-full"
      position={Tabs.TabPosition.right}
      tab={activeTab}
      onTabChange={setActiveTab}
      extraContent={
        <TabChanger activeTab={activeTab} setActiveTab={setActiveTab} />
      }
      tabs={tabs}
    />
  )
}

export function TabsInPillsAtRight() {
  return (
    <Tabs
      position={Tabs.TabPosition.right}
      type={Tabs.TabType.pill}
      tabs={tabs}
    />
  )
}
