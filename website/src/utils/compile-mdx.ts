import * as path from 'path'
import * as fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import rehypeHeading, { HeadingNode } from 'plugins/rehype-heading'
import rehypePlayground from 'plugins/rehype-playground'

/**
 * Compile mdx file to get the react code, frontmatter and headings present in the file.
 * It uses the mdx-bundler package to do the compilation.
 *
 * @param mdxPath - the path of the mdx file (relative to the `src/docs` directory)
 */
export default async function compileMdx(
  mdxPath: string,
): Promise<{
  code: string
  frontmatter: { [key: string]: any }
  headings: HeadingNode[]
}> {
  // cwd point to the root directory of website
  const cwd = process.cwd()
  const docsDir = path.resolve(cwd, 'src/docs')
  const docPath = path.resolve(docsDir, mdxPath)

  // get content of the file
  const content = fs.readFileSync(docPath, 'utf8')

  // list of the heading present in the file, it would be populated by the rehypeHeading plugin
  const headings: HeadingNode[] = []

  const { code, frontmatter } = await bundleMDX(content, {
    xdmOptions: (options) => {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        // rehype plugin to inject `code` prop in the `<Playground />` component
        // refer `plugins/rehype-playground` for more details
        rehypePlayground,
        // rehype plugin to add slug in the heading
        require('rehype-slug'),
        // rehype plugin to get the heading present in the file
        rehypeHeading(headings),
      ]
      return options
    },
  })

  return {
    headings,
    code,
    frontmatter,
  }
}
