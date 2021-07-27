import React, { Children, cloneElement } from 'react'
import Playground from 'components/playground'
import PropsTable from 'components/props-table'

export type WrapperProps = {
  children: React.ReactNode
}

export function Wrapper({ children }: WrapperProps) {
  const allChildren = (Children.toArray(children)[0] as React.ReactElement)
    .props.children as React.ReactElement[]
  const items: React.ReactElement[] = []
  let currentChild: React.ReactElement[] = []
  for (let i = 0; i < allChildren.length; i++) {
    const child = allChildren[i]
    if (child.type === Playground || child.type === PropsTable) {
      if (currentChild.length > 0) {
        items.push(<div className="prose !max-w-full">{currentChild}</div>)
        items.push(child)
      }
      currentChild = []
    } else {
      currentChild.push(child)
    }
  }

  if (currentChild.length > 0) {
    items.push(<div className="prose !max-w-full">{currentChild}</div>)
  }

  return <>{items.map((item, index) => cloneElement(item, { key: index }))}</>
}
