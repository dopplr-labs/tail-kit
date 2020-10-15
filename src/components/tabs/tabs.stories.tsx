import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import {
  CreditCardSolid,
  OfficeBuildingSolid,
  UserCircleSolid,
  UsersSolid,
} from 'components/icons'
import Select from 'components/select'
import { Tabs } from './tabs'
import { TabPane } from './components/tab-pane'

export default {
  component: Tabs,
  title: 'Navigation/Tabs',
  subcomponents: { TabPane },
} as Meta

export function DefaultTabs() {
  return (
    <Tabs>
      <Tabs.TabPane title="Tab 1" key="tab-1">
        <div className="text-sm text-gray-700">Tab Content 1</div>
      </Tabs.TabPane>
      <Tabs.TabPane title="Tab 2" key="tab-2">
        <div className="text-sm text-gray-700">Tab Content 2</div>
      </Tabs.TabPane>
      <Tabs.TabPane title="Tab 3" key="tab-3">
        <div className="text-sm text-gray-700">Tab Content 3</div>
      </Tabs.TabPane>
    </Tabs>
  )
}

const tabs = [
  {
    title: 'My Account',
    content: 'Account Details',
    icon: <UserCircleSolid />,
    key: 'my-account',
  },
  {
    title: 'Company',
    content: 'Company Details',
    key: 'company',
    icon: <OfficeBuildingSolid />,
  },
  {
    title: 'Team Members',
    content: 'Team Members Details',
    key: 'team-members',
    icon: <UsersSolid />,
  },
  {
    title: 'Billing',
    content: 'Billing Details',
    key: 'billing',
    icon: <CreditCardSolid />,
  },
]

export function TabsWithIcon() {
  return (
    <Tabs>
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export function TabsWithExtraContent() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      tab={activeTab}
      onTabChange={setActiveTab}
      extraContent={
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
      }
    >
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export function TabsInPills() {
  return (
    <Tabs type={Tabs.TabTypes.pill}>
      <Tabs.TabPane title="Tab 1" key="tab-1">
        <div className="text-sm text-gray-700">Tab Content 1</div>
      </Tabs.TabPane>
      <Tabs.TabPane title="Tab 2" key="tab-2">
        <div className="text-sm text-gray-700">Tab Content 2</div>
      </Tabs.TabPane>
      <Tabs.TabPane title="Tab 3" key="tab-3">
        <div className="text-sm text-gray-700">Tab Content 3</div>
      </Tabs.TabPane>
    </Tabs>
  )
}

export function TabsWithIconInPills() {
  return (
    <Tabs type={Tabs.TabTypes.pill}>
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export function TabsInPillsWithExtraContent() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      type={Tabs.TabTypes.pill}
      tab={activeTab}
      onTabChange={setActiveTab}
      extraContent={
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
      }
    >
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
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
      }
    >
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export function TabsInPillsAtBottom() {
  return (
    <Tabs position={Tabs.TabPosition.bottom} type={Tabs.TabTypes.pill}>
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export function TabsAtLeft() {
  return (
    <Tabs position={Tabs.TabPosition.left}>
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export function TabsInPillsAtLeft() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      tab={activeTab}
      onTabChange={setActiveTab}
      position={Tabs.TabPosition.left}
      type={Tabs.TabTypes.pill}
      extraContent={
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
      }
    >
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export function TabsAtRight() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      position={Tabs.TabPosition.right}
      tab={activeTab}
      onTabChange={setActiveTab}
      extraContent={
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
      }
    >
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}

export function TabsInPillsAtRight() {
  return (
    <Tabs position={Tabs.TabPosition.right} type={Tabs.TabTypes.pill}>
      {tabs.map((tab) => (
        <Tabs.TabPane title={tab.title} key={tab.key} icon={tab.icon}>
          <div className="text-sm text-gray-700">{tab.content}</div>
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}
