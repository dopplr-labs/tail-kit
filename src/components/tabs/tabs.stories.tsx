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

export function TabsWithIcon() {
  return (
    <Tabs>
      <Tabs.TabPane
        title="My Account"
        key="my-account"
        icon={<UserCircleSolid />}
      >
        <div className="text-sm text-gray-700">Account Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane
        title="Company"
        key="company"
        icon={<OfficeBuildingSolid />}
      >
        <div className="text-sm text-gray-700">Company Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane
        title="Team Members"
        key="team-members"
        icon={<UsersSolid />}
      >
        <div className="text-sm text-gray-700">Team Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane title="Billing" key="billing" icon={<CreditCardSolid />}>
        <div className="text-sm text-gray-700">Billing Details</div>
      </Tabs.TabPane>
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
          options={[
            {
              label: 'My Account',
              value: 'my-account',
              icon: <UserCircleSolid />,
            },
            {
              label: 'Company',
              value: 'company',
              icon: <OfficeBuildingSolid />,
            },
            {
              label: 'Team Members',
              value: 'team-members',
              icon: <UsersSolid />,
            },
            {
              label: 'Billing',
              value: 'billing',
              icon: <CreditCardSolid />,
            },
          ]}
          placeholder="Select Tab"
        />
      }
    >
      <Tabs.TabPane
        title="My Account"
        key="my-account"
        icon={<UserCircleSolid />}
      >
        <div className="text-sm text-gray-700">Account Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane
        title="Company"
        key="company"
        icon={<OfficeBuildingSolid />}
      >
        <div className="text-sm text-gray-700">Company Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane
        title="Team Members"
        key="team-members"
        icon={<UsersSolid />}
      >
        <div className="text-sm text-gray-700">Team Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane title="Billing" key="billing" icon={<CreditCardSolid />}>
        <div className="text-sm text-gray-700">Billing Details</div>
      </Tabs.TabPane>
    </Tabs>
  )
}

export function TabsInPills() {
  return (
    <Tabs type="pill">
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
    <Tabs type="pill">
      <Tabs.TabPane
        title="My Account"
        key="my-account"
        icon={<UserCircleSolid />}
      >
        <div className="text-sm text-gray-700">Account Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane
        title="Company"
        key="company"
        icon={<OfficeBuildingSolid />}
      >
        <div className="text-sm text-gray-700">Company Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane
        title="Team Members"
        key="team-members"
        icon={<UsersSolid />}
      >
        <div className="text-sm text-gray-700">Team Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane title="Billing" key="billing" icon={<CreditCardSolid />}>
        <div className="text-sm text-gray-700">Billing Details</div>
      </Tabs.TabPane>
    </Tabs>
  )
}

export function TabsInPillsWithExtraContent() {
  const [activeTab, setActiveTab] = useState<string | undefined>('my-account')

  return (
    <Tabs
      type="pill"
      tab={activeTab}
      onTabChange={setActiveTab}
      extraContent={
        <Select
          value={activeTab}
          onChange={setActiveTab}
          className="w-48"
          options={[
            {
              label: 'My Account',
              value: 'my-account',
              icon: <UserCircleSolid />,
            },
            {
              label: 'Company',
              value: 'company',
              icon: <OfficeBuildingSolid />,
            },
            {
              label: 'Team Members',
              value: 'team-members',
              icon: <UsersSolid />,
            },
            {
              label: 'Billing',
              value: 'billing',
              icon: <CreditCardSolid />,
            },
          ]}
          placeholder="Select Tab"
        />
      }
    >
      <Tabs.TabPane
        title="My Account"
        key="my-account"
        icon={<UserCircleSolid />}
      >
        <div className="text-sm text-gray-700">Account Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane
        title="Company"
        key="company"
        icon={<OfficeBuildingSolid />}
      >
        <div className="text-sm text-gray-700">Company Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane
        title="Team Members"
        key="team-members"
        icon={<UsersSolid />}
      >
        <div className="text-sm text-gray-700">Team Details</div>
      </Tabs.TabPane>
      <Tabs.TabPane title="Billing" key="billing" icon={<CreditCardSolid />}>
        <div className="text-sm text-gray-700">Billing Details</div>
      </Tabs.TabPane>
    </Tabs>
  )
}
