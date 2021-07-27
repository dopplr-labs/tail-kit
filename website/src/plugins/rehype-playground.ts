import toMarkdown from 'mdast-util-to-markdown'
import mdxJsx from 'mdast-util-mdx-jsx'
import prettier from 'prettier'

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

      // if child is another JSX element, we need to convert it to markdown string
      if (children.type === 'mdxJsxFlowElement') {
        code = toMarkdown(children, {
          extensions: [mdxJsx.toMarkdown],
        })
      } else if (children.type === 'mdxFlowExpression') {
        // else if the child is a string, we just use the formatted string
        code = prettier.format(children.value, {
          semi: false,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          parser: 'babel',
        })
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
