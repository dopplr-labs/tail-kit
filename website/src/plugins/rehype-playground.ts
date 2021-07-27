import toMarkdown from 'mdast-util-to-markdown'
import mdx from 'mdast-util-mdx'
import format from 'utils/format'

/**
 * Rehype plugin to inject code prop into the Playground component.
 * The Playground component expects the code to be a string, but in the mdx files
 * we tend to write the code as a JSX element. So this plugins transforms the JSX into
 * string and inserts it into the code prop.
 *
 * @returns - a transformer function which would traverse the AST and udpate it
 */
export default function rehypePlayground() {
  return (tree: any) => {
    // get all the Playground components from ast
    const playgrounds = tree.children.filter(
      (node: any) =>
        node.type === 'mdxJsxFlowElement' && node.name === 'Playground',
    )

    for (const playground of playgrounds) {
      const children = playground.children?.[0]

      if (!children) {
        return
      }

      let code: string | undefined

      try {
        code = toMarkdown(children, {
          extensions: [
            mdx.toMarkdown,
            // add custom extension to conver 'element' to string
            // keep on adding handlers for more types of elements
            {
              // handler tries to take a node and return a string
              handlers: {
                // for an expression just return it's value
                mdxFlowExpression: (node: any) => node.value,

                // for an element just return it's text content
                element: (node: any) => {
                  const text = node.children.find(
                    (child) => child.type === 'text',
                  )
                  return text?.value ?? ''
                },
              },
            },
          ],
        })
      } catch (error) {
        // @TODO: Add proper error handling
      }

      if (code) {
        // format code using prettier
        code = format(code)
      }

      // inject the code into the Playground component's attributes
      // attributes correspond to the props in mdx
      if (code && Array.isArray(playground.attributes)) {
        playground.attributes.push({
          type: 'mdxJsxAttribute',
          name: 'code',
          value: code,
        })
      }
    }
  }
}
