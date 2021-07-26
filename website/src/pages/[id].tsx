import React, { Children, cloneElement, ReactElement, useMemo } from 'react'
import clsx from 'clsx'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from 'next'
import * as path from 'path'
import * as fs from 'fs'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { withCustomConfig, PropItem } from 'react-docgen-typescript'
import PropsContext from 'contexts/props-context'
import PropsTable from 'components/props-table'
import Playground from 'components/playground'
import rehypePlayground from 'plugins/rehype-playground'
import rehypeHeading, { HeadingNode } from 'plugins/rehype-heading'
import Head from 'next/head'

function validate<T extends object>(input: T): T {
  for (const key of Object.keys(input)) {
    if (typeof input[key] === 'undefined') {
      input[key] = null
    } else if (typeof input[key] === 'object' && input[key] !== null) {
      validate(input[key])
    }
  }
  return input
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const allChildren = (Children.toArray(children)[0] as React.ReactElement)
    .props.children as ReactElement[]
  const items: React.ReactElement[] = []
  let currentChild: React.ReactElement[] = []
  for (let i = 0; i < allChildren.length; i++) {
    const child = allChildren[i]
    if (child.type && typeof child.type !== 'string') {
      if (currentChild.length > 0) {
        items.push(<div className="prose !max-w-full">{currentChild}</div>)
        items.push(child)
      }
      currentChild = []
    } else {
      currentChild.push(child)
    }
  }
  return <>{items.map((item, index) => cloneElement(item, { key: index }))}</>
}

type HeadingProps = {
  heading: HeadingNode
}

function Heading({ heading }: HeadingProps) {
  return (
    <div className="space-y-2">
      <a
        href={`#${heading.slug}`}
        className={clsx(
          'block text-gray-400 hover:text-gray-800',
          heading.type === 'h2' ? 'text-base' : 'text-sm',
        )}
      >
        {heading.name}
      </a>
      {heading.children.length > 0 ? (
        <div className="pl-4 space-y-2">
          {heading.children.map((heading) => (
            <Heading key={heading.slug} heading={heading} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

type ComponentPageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function ComponentPage({
  code,
  frontmatter,
  componentProps,
  headings,
}: ComponentPageProps) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <div>
      <Head>
        <title>{frontmatter.title} - Documentation</title>
      </Head>
      <div className="max-w-screen-lg p-8 mx-auto space-y-6">
        <PropsContext.Provider value={{ props: componentProps }}>
          <Component
            components={{
              wrapper: Wrapper,
              Playground: Playground as React.ComponentType,
              PropsTable,
            }}
          />
        </PropsContext.Provider>
        <div className="fixed top-20 right-[120px] space-y-4">
          {headings.map((heading) => (
            <Heading heading={heading} key={heading.slug} />
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths(): Promise<
  GetStaticPathsResult<{ id: string }>
> {
  const docsDir = path.resolve(process.cwd(), 'src/docs')
  const docs = fs.readdirSync(docsDir) as string[]
  return {
    paths: docs.map((doc) => ({
      params: {
        id: doc.replace('.mdx', ''),
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps(
  ctx: GetStaticPropsContext,
): Promise<
  GetStaticPropsResult<{
    id: string
    code: string
    frontmatter: { [key: string]: string }
    componentProps: PropItem[]
    headings: HeadingNode[]
  }>
> {
  const { id } = ctx.params

  const cwd = process.cwd()
  const docsDir = path.resolve(cwd, 'src/docs')
  const docPath = path.join(docsDir, `${id}.mdx`)
  const content = fs.readFileSync(docPath, 'utf8')

  const headings: HeadingNode[] = []

  const { code, frontmatter } = await bundleMDX(content, {
    xdmOptions: (options) => {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypePlayground,
        require('rehype-slug'),
        rehypeHeading(headings),
      ]
      return options
    },
  })

  const { componentPath, component } = frontmatter
  const compiler = withCustomConfig(
    path.join(cwd, '../packages/tail-kit/tsconfig.json'),
    {},
  )
  const output = compiler.parse(
    path.join(cwd, '../packages/tail-kit', componentPath),
  )
  const allProps = output.find((item) => item.displayName === component)?.props
  const componentProps =
    Object.values(allProps).filter(({ declarations }) =>
      declarations?.find(({ fileName }) => fileName?.includes(componentPath)),
    ) ?? []
  return {
    props: {
      id: 'button',
      code,
      frontmatter,
      componentProps: componentProps.map(validate),
      headings,
    },
  }
}
