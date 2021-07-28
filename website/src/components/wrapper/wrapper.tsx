import React, { Children, cloneElement } from 'react'
import Playground from 'components/playground'
import PropsTable from 'components/props-table'

export type WrapperProps = {
  children: React.ReactNode
}

/**
 * Wrapper component to wrap the children with a common div having `prose` class.
 * The basic idea is wrapping the entire document with a div having `prose` class, will impact
 * the styles of the elements shown in the playground.
 * So this component traverses the tree and as soon as Playground or PropsTable is found,
 * it will take all the previous children and wrap them with a div having `prose` class.
 */
export function Wrapper({ children }: WrapperProps) {
  const allChildren = (Children.toArray(children)[0] as React.ReactElement)
    .props.children as React.ReactElement[]

  const itemsToRender: React.ReactElement[] = []

  // array containing all the children to be wrapped
  let childrenToBeWrapped: React.ReactElement[] = []

  for (let i = 0; i < allChildren.length; i++) {
    const child = allChildren[i]
    // if the child is a Playground or PropsTable
    if (child.type === Playground || child.type === PropsTable) {
      // then check if there were any previous siblings
      if (childrenToBeWrapped.length > 0) {
        // if so, wrap them with a div having `prose` class and add them to the items to render
        itemsToRender.push(
          <div className="prose !max-w-full">{childrenToBeWrapped}</div>,
        )
      }
      // reset the children to be wrapped
      childrenToBeWrapped = []
      itemsToRender.push(child)
    } else {
      // else push the current child to the children to be wrapped
      childrenToBeWrapped.push(child)
    }
  }

  // if there was no Playground or PropsTable
  // or there were any children after the Playground or PropsTable
  // then the childrenToBeWrapped array won't be wrapped till now
  // so we need to wrap them with a div having `prose` class and push into items to render
  if (childrenToBeWrapped.length > 0) {
    itemsToRender.push(
      <div className="prose !max-w-full">{childrenToBeWrapped}</div>,
    )
  }

  return (
    <>
      {itemsToRender.map((item, index) => cloneElement(item, { key: index }))}
    </>
  )
}
