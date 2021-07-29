import nodeToString from 'hast-util-to-string'
import visit from 'unist-util-visit'

export type HeadingNode = {
  type: 'h2' | 'h3'
  name: string
  slug: string
  children: HeadingNode[]
}

/**
 * Rehype plugin to get all the headings with their content and slug. This plugin also retains the heirarchy of headings.
 * For example, if you have a heading(h2) with a subheading(h3), the subheading will be a child of the heading.
 * Right now, this only works for h2 and h3 headings.
 *
 * @param headingsContainer - the list in which all the headings would be populated
 * @returns - a transformer function which would traverse the AST and inject all the headings found
 */
export default function rehypeHeading(headingsContainer: HeadingNode[]) {
  return () => (tree: any) => {
    // node containing the latest heading (h2)
    let currentHeading: HeadingNode | undefined

    // visit all the elements in the AST
    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'h2') {
        // if the current element is heading and there is another heading element
        // already present, then we need to first push the previous heading-subheading heirarchy into the
        // headingsContainer and then create a new heading-subheading heirarchy
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
        // if a heading node is already present, then it means this is child of heading
        if (currentHeading) {
          currentHeading.children.push(heading)
        } else {
          // it is an independent heading
          headingsContainer.push(heading)
        }
      }
    })
    // for the last heading, push it into the headingsContainer
    if (currentHeading) {
      headingsContainer.push(currentHeading)
    }
  }
}
