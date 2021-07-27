import React, { useMemo } from 'react'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from 'next'
import Head from 'next/head'
import * as path from 'path'
import * as fs from 'fs'
import { getMDXComponent } from 'mdx-bundler/client'
import { PropItem } from 'react-docgen-typescript'
import { HeadingsProvider } from 'hooks/use-headings'
import compileMdx from 'utils/compile-mdx'
import getComponentProps from 'utils/get-component-props'
import { HeadingNode } from 'plugins/rehype-heading'
import PropsContext from 'contexts/props-context'
import Heading from 'components/heading'
import Wrapper from 'components/wrapper'
import PropsTable from 'components/props-table'
import Playground from 'components/playground'

type DocPageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function DocPage({
  code,
  frontmatter,
  componentProps,
  headings,
}: DocPageProps) {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <Head>
        {/* @TODO: Add og:meta tags for better SEO */}
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
          <HeadingsProvider
            headings={[
              ...headings,
              ...headings.flatMap((heading) => heading.children),
            ]}
          >
            {headings.map((heading) => (
              <Heading heading={heading} key={heading.slug} />
            ))}
          </HeadingsProvider>
        </div>
      </div>
    </>
  )
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
  const { id } = ctx.params as { id: string }

  // path of the mdx file (relative to `src/docs` directory)
  const docPath = `${id}.mdx`
  const { headings, code, frontmatter } = await compileMdx(docPath)

  // generate prop type definitions
  const { componentPath, component: componentName } = frontmatter
  const componentProps = getComponentProps(componentPath, componentName)

  return {
    props: {
      id,
      code,
      frontmatter,
      componentProps,
      headings,
    },
  }
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
    fallback: process.env.NODE_ENV === 'development',
  }
}
