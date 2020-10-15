import React, { Children } from 'react'
import clsx from 'clsx'
import useSyncedState from 'hooks/use-synced-states'
import { useMemoOne } from 'use-memo-one'
import { TabPane, TabPaneProps } from './components/tab-pane'

let count = 0
function getTabId() {
  return count++
}

export enum TabTypes {
  pill = 'pill',
  underline = 'underline',
}

export enum TabPosition {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
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
  type?: TabTypes
  /**
   * The position of the tabs list with respect to the content.
   * By default the tabs list would be rendered over the top of the content.
   */
  position?: TabPosition
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
 * The `Tabs` component can be configured to render the **tabs list** in various styles by changing `position` and `type` parameters.
 */
export function Tabs({
  tab: tabKey,
  defaultTab: defaultTabKey,
  onTabChange,
  type = TabTypes.underline,
  position = TabPosition.top,
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

  const tabContainerClassNames = {
    [TabPosition.top]: 'flex flex-col',
    [TabPosition.bottom]: 'flex flex-col flex-col-reverse',
    [TabPosition.left]: 'flex flex-row',
    [TabPosition.right]: 'flex flex-row-reverse',
  }

  const tabsListContainerClassNames = {
    [TabPosition.top]:
      'flex flex-1 space-x-8 items-end mb-4 bg-white border-b border-gray-200',
    [TabPosition.bottom]:
      'flex items-top mt-4 bg-white border-t border-gray-200',
    [TabPosition.left]:
      'flex flex-col space-y-6 mr-4 bg-white border-r border-gray-200',
    [TabPosition.right]:
      'flex flex-col space-y-6 ml-4 border-l border-gray-200',
  }

  const tabsListClassNames = {
    [TabPosition.top]: 'flex flex-1 space-x-8',
    [TabPosition.bottom]: 'flex flex-1 space-x-8 ',
    [TabPosition.left]: 'flex flex-col space-y-6',
    [TabPosition.right]: 'flex flex-col space-y-6',
  }

  const tabClassNames = {
    [TabTypes.underline]: {
      base: undefined,
      active: 'border-blue-500 text-blue-600 focus:border-blue-700',
      inactive:
        'border-transparent text-gray-500 hover:text-gray-700 focus:text-gray-700',
      [TabPosition.top]: 'px-1 pb-3 border-b-2 border-transparent -mb-px',
      [TabPosition.bottom]: 'px-1 pt-3 border-t-2 border-transparent -mt-px',
      [TabPosition.left]: 'pr-4 border-r-2 -mr-px',
      [TabPosition.right]: 'pl-4 border-l-2 -ml-px',
    },
    [TabTypes.pill]: {
      base: 'px-3 py-2 rounded-md',
      active: 'bg-blue-50 text-blue-600 focus:bg-blue-100',
      inactive: 'hover:bg-gray-100 text-gray-500 focus:bg-gray-100',
      [TabPosition.top]: 'mb-3',
      [TabPosition.bottom]: 'mt-3',
      [TabPosition.left]: 'mr-4',
      [TabPosition.right]: 'ml-4',
    },
  }

  const extraContentClassNames = {
    [TabPosition.top]: 'mb-3',
    [TabPosition.bottom]: 'mt-3',
    [TabPosition.left]: 'mr-4',
    [TabPosition.right]: 'ml-4',
  }

  return (
    <div
      className={clsx(tabContainerClassNames[position], className)}
      style={style}
    >
      <div className={tabsListContainerClassNames[position]}>
        <div
          className={clsx(tabsListClassNames[position], tabBarClassName)}
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
                tabClassNames[type].base,
                tabClassNames[type][position],
                tab.key === activeTab
                  ? tabClassNames[type].active
                  : tabClassNames[type].inactive,
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
        {extraContent ? (
          <div className={extraContentClassNames[position]}>{extraContent}</div>
        ) : null}
      </div>
      <div
        role="tabpanel"
        className="flex-1"
        id={`panel-${_tabId}-${activeTab}`}
        aria-labelledby={`tab-${_tabId}-${activeTab}`}
      >
        {activeTabContent}
      </div>
    </div>
  )
}

Tabs.TabPane = TabPane
Tabs.TabTypes = TabTypes
Tabs.TabPosition = TabPosition
