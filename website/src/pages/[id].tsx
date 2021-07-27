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
import compileMdx from 'utils/compile-mdx'
import getComponentProps from 'utils/get-component-props'
import { HeadingNode } from 'plugins/rehype-heading'
import PropsContext from 'contexts/props-context'
import Wrapper from 'components/wrapper'
import PropsTable from 'components/props-table'
import Playground from 'components/playground'
import PageNav from 'components/page-nav'
import CodeBlock from 'components/code-block'

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

      <div className="flex items-start max-w-screen-lg p-8 mx-auto space-x-16">
        <div className="space-y-6">
          <PropsContext.Provider value={{ props: componentProps }}>
            <Component
              components={{
                wrapper: Wrapper,
                Playground: Playground as React.ComponentType,
                PropsTable,
                pre: CodeBlock,
              }}
            />
          </PropsContext.Provider>
        </div>
        <PageNav headings={headings} className="sticky flex-shrink-0 top-8" />
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
  // cwd point to the root directory of website
  const docsDir = path.resolve(process.cwd(), 'src/docs')
  const allDocs = fs.readdirSync(docsDir) as string[]

  return {
    paths: allDocs.map((doc) => ({
      params: {
        // the id of the doc is the name of the mdx file
        id: doc.replace('.mdx', ''),
      },
    })),
    fallback: process.env.NODE_ENV === 'development',
  }
}
