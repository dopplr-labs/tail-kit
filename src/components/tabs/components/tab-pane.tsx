import React from 'react'

/** Tab Pane properties */
export type TabPaneProps = {
  /** Title of the tab */
  title: string
  /** Icon to be rendered along with the tab title */
  icon?: JSX.Element
  /** Unique key to identify the tab */
  key: React.Key
  /** Tab content */
  children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TabPane(props: TabPaneProps) {
  // Do not render anything, the TabPane component is just a placeholder component
  // for defining the props
  // the props are extracted in the Tab component and rendered over there
  return null
}
