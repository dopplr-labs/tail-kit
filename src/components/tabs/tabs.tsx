import React, { Children } from 'react'
import clsx from 'clsx'
import useSyncedState from 'hooks/use-synced-states'
import { useMemoOne } from 'use-memo-one'
import { TabPane, TabPaneProps } from './components/tab-pane'

let count = 0
function getTabId() {
  return count++
}

/** Tabs properties */
export type TabsProps = {
  /** Key of the tab selected */
  tab?: string
  /**
   * Key of the default tab selected. This should be used when the Tab component is used in uncontrolled way
   * */
  defaultTab?: number
  /** Callback function called when the active tab is changed. */
  onTabChange?: (activeTabKey: string) => void
  /**
   * The type of the tab item rendered inside the tabs list. If it is pill, then it would render
   * the tab title and icon with pills and else the active tab would be underlined
   */
  type?: 'pill' | 'underline'
  /** List of `TabPane`s to be rendered */
  children:
    | React.ReactElement<TabPaneProps>
    | React.ReactElement<TabPaneProps>[]
  /**
   * Extra content to be rendered in the tabs list.
   * It would be rendered at the end of the tabs list. It won't scroll even if the tabs list might scroll
   * */
  extraContent?: React.ReactNode
  /** Additional classes for styling */
  className?: string
  /** Additional styles */
  style?: React.CSSProperties
  /** Additional classes for styling tab bar */
  tabBarClassName?: string
  /** Additonal styles for tab bar */
  tabBarStyle?: React.CSSProperties
}

/**
 * Component to render **tabs**.
 *
 */
export function Tabs({
  tab: tabKey,
  defaultTab: defaultTabKey,
  onTabChange,
  type = 'underline',
  children,
  extraContent,
  className,
  style,
  tabBarClassName,
  tabBarStyle,
}: TabsProps) {
  const _tabId = useMemoOne(() => getTabId(), [])

  const tabsList = Children.map(
    children,
    (node: React.ReactElement<TabPaneProps>, index) => {
      const key = String(node.key || index)
      return {
        ...node.props,
        key,
      }
    },
  )

  const [activeTab, setActiveTab] = useSyncedState(
    tabKey || defaultTabKey || tabsList[0].key,
  )

  const activeTabContent = tabsList.find((tab) => tab.key === activeTab)
    ?.children

  const tabStyles = {
    pill: {
      base: 'px-3 py-2 my-3 rounded-md',
      active: 'bg-blue-50 text-blue-600 focus:bg-blue-100',
      inactive: 'hover:bg-gray-100 text-gray-500 focus:bg-gray-100',
    },
    underline: {
      base: 'px-1 py-3 border-b-2 border-transparent -mb-px',
      active: 'border-blue-500 text-blue-600 focus:border-blue-700',
      inactive:
        'border-transparent text-gray-500 hover:text-gray-700 focus:text-gray-700',
    },
  }

  return (
    <div className={className} style={style}>
      <div className="flex items-end mb-4 bg-white border-b border-gray-200">
        <div
          className={clsx('flex flex-1 space-x-8', tabBarClassName)}
          style={tabBarStyle}
          role="tablist"
        >
          {tabsList.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              id={`tab-${_tabId}-${activeTab}`}
              aria-selected={tab.key === activeTab}
              aria-controls={`panel-${_tabId}-${tab.key}`}
              className={clsx(
                'text-sm font-medium focus:outline-none transition-colors duration-200 whitespace-no-wrap flex space-x-2 items-center',
                tabStyles[type].base,
                tab.key === activeTab
                  ? tabStyles[type].active
                  : tabStyles[type].inactive,
              )}
              onClick={() => {
                setActiveTab(tab.key)
                onTabChange?.(tab.key)
              }}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
        <div className="mb-3">{extraContent}</div>
      </div>
      <div
        role="tabpanel"
        id={`panel-${_tabId}-${activeTab}`}
        aria-labelledby={`tab-${_tabId}-${activeTab}`}
      >
        {activeTabContent}
      </div>
    </div>
  )
}

Tabs.TabPane = TabPane
