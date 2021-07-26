import nodeToString from 'hast-util-to-string'
import visit from 'unist-util-visit'

export type HeadingNode = {
  type: 'h2' | 'h3'
  name: string
  slug: string
  children: HeadingNode[]
}

export default function rehypeHeading(headingsContainer: HeadingNode[]) {
  return () => (tree: any) => {
    let currentHeading: HeadingNode | undefined
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'h2') {
        if (currentHeading) {
          headingsContainer.push(currentHeading)
        }
        currentHeading = {
          type: 'h2',
          name: nodeToString(node),
          slug: node.properties.id,
          children: [],
        }
      } else if (node.tagName === 'h3') {
        const heading: HeadingNode = {
          type: 'h3',
          name: nodeToString(node),
          slug: node.properties.id,
          children: [],
        }
        if (currentHeading) {
          currentHeading.children.push(heading)
        } else {
          headingsContainer.push(heading)
        }
      }
    })
    if (currentHeading) {
      headingsContainer.push(currentHeading)
    }
  }
}
