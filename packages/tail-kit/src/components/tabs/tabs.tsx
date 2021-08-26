import React from 'react'
import clsx from 'clsx'
import useSyncedState from 'hooks/use-synced-states'
import { useMemoOne } from 'use-memo-one'

let count = 0
function getTabId() {
  return count++
}

export type Tab = {
  /** Title of the tab */
  title: string
  /** Icon to be rendered along with the tab title */
  icon?: JSX.Element
  /** Unique key to identify the tab */
  key: string
  /** Tab content */
  content: React.ReactNode
}

/** Tabs properties */
export type TabsProps = {
  /** Key of the tab selected */
  tab?: string
  /**
   * Key of the default tab selected. This should be used when the Tab component is used in uncontrolled way
   * */
  defaultTab?: string
  /** Callback function called when the active tab is changed. */
  onTabChange?: (activeTabKey: string) => void
  /**
   * The type of the tab item rendered inside the tabs list. If it is pill, then it would render
   * the tab title and icon with pills and else the active tab would be underlined
   */
  type?: 'pill' | 'underline'
  /**
   * The position of the tabs list with respect to the content.
   * By default the tabs list would be rendered over the top of the content.
   */
  position?: 'top' | 'bottom' | 'left' | 'right'

  tabs: Tab[]
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
  tabs,
  type = 'underline',
  position = 'top',
  extraContent,
  className,
  style,
  tabBarClassName,
  tabBarStyle,
}: TabsProps) {
  const _tabId = useMemoOne(() => getTabId(), [])

  const [activeTab, setActiveTab] = useSyncedState(
    tabKey || defaultTabKey || tabs[0].key,
  )

  const activeTabContent = tabs.find((tab) => tab.key === activeTab)?.content

  // tabsContainer wraps the tab list and the content
  // by default the tab container is of type flex
  // with the first element being tab list and the second being the container
  // so it can be styled with basic flex properties
  const tabsContainerClassName = {
    top: 'flex-col',
    // use col-reverse to render the content at top
    bottom: 'flex-col-reverse',
    left: 'flex-row',
    // use row-reverse to render the content at left
    right: 'flex-row-reverse',
  }

  // tabs list container contians the tabs list and the extra content
  // as the border should be present both below the tabs list and extra content
  // it makes sense to wrap them in another list container
  const tabsListContainerClassNames = {
    top: 'space-x-8 items-end mb-4 border-b ',
    bottom: 'space-x-8 items-top mt-4 border-t',
    left: 'flex-col items-start space-y-6 mr-4 border-r ',
    right: 'flex-col items-start space-y-6 ml-4 border-l',
  }

  const tabsListClassNames = {
    top: 'space-x-8',
    bottom: 'space-x-8 ',
    left: 'flex-col w-full space-y-6',
    right: 'flex-col w-full space-y-6',
  }

  const tabClassNames = {
    underline: {
      base: undefined,
      active: 'text-blue-600 border-blue-500 focus:border-blue-700',
      inactive:
        'text-gray-500 border-transparent hover:text-gray-700 focus:text-gray-700',
      top: 'px-1 pb-3 border-b-2 -mb-px',
      bottom: 'px-1 pt-3 border-t-2 -mt-px',
      left: 'py-1 pr-4 border-r-2 -mr-px',
      right: 'py-1 pl-4 border-l-2 -ml-px',
    },
    pill: {
      base: 'px-3 py-2 rounded-md',
      active: 'bg-blue-50 text-blue-600 focus:bg-blue-100',
      inactive: 'text-gray-500 hover:bg-gray-100 focus:bg-gray-100',
      top: 'mb-3',
      bottom: 'mt-3',
      left: 'mr-4',
      right: 'ml-4',
    },
  }

  const extraContentClassNames = {
    top: 'mb-3',
    bottom: 'mt-3',
    left: 'mr-4',
    right: 'ml-4',
  }

  return (
    <div
      className={clsx('flex', tabsContainerClassName[position], className)}
      style={style}
      data-testid="tabs-container"
    >
      <div
        className={clsx(
          'flex bg-white border-gray-200',
          tabsListContainerClassNames[position],
        )}
        data-testid="tabslist-container"
      >
        <div
          className={clsx(
            'flex flex-1',
            tabsListClassNames[position],
            tabBarClassName,
          )}
          style={tabBarStyle}
          role="tablist"
        >
          {tabs.map((tab) => (
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
