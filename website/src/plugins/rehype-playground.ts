import toMarkdown from 'mdast-util-to-markdown'
import mdxJsx from 'mdast-util-mdx-jsx'
import prettier from 'prettier'

export default function rehypePlayground() {
  return (tree: any) => {
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
      if (children.type === 'mdxJsxFlowElement') {
        code = toMarkdown(children, {
          extensions: [mdxJsx.toMarkdown],
        })
      } else if (children.type === 'mdxFlowExpression') {
        code = prettier.format(children.value, {
          semi: false,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          parser: 'babel',
        })
      }
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
