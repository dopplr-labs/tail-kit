import React, { useMemo } from 'react'
import Head from 'next/head'
import { getMDXComponent } from 'mdx-bundler/client'
import { PropItem } from 'react-docgen-typescript'
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from 'next'
import * as path from 'path'
import * as fs from 'fs'
import compileMdx from 'utils/compile-mdx'
import { getComponentsProps } from 'utils/get-component-props'
import { HeadingNode } from 'plugins/rehype-heading'
import PropsContext from 'contexts/props-context'
import Wrapper from 'components/wrapper'
import PropsTable from 'components/props-table'
import Playground from 'components/playground'
import PageNav from 'components/page-nav'
import CodeBlock from 'components/code-block'
import { PageHeadingH2, PageHeadingH3 } from 'components/page-heading'

type DocPageProps = InferGetStaticPropsType<typeof getStaticProps>

export default function DocPage({
  code,
  frontmatter,
  componentsProps,
  headings,
}: DocPageProps) {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <>
      <Head>
        {/* @TODO: Add og:meta tags for better SEO */}
        <title>{frontmatter.title} | Tail Kit</title>
      </Head>

      <div className="flex flex-1 w-full max-w-8xl">
        <div
          id="sidebar"
          className="fixed inset-0 z-40 flex-none hidden w-full h-full bg-black bg-opacity-25 lg:bg-white lg:h-auto lg:static xl:w-72 lg:w-64 lg:block lg:overflow-y-visible"
        />
        <div className="flex-auto w-full min-w-0 lg:overflow-visible lg:static lg:max-h-full">
          <div className="flex w-full">
            <div className="flex-auto min-w-0 px-4 pt-10 pb-24 sm:px-6 xl:px-10 lg:pb-16">
              <div className="space-y-6">
                <PropsContext.Provider value={{ props: componentsProps }}>
                  <Component
                    components={{
                      wrapper: Wrapper,
                      Playground: Playground as React.ComponentType,
                      PropsTable: PropsTable as React.ComponentType,
                      pre: CodeBlock,
                      h2: PageHeadingH2,
                      h3: PageHeadingH3,
                    }}
                  />
                </PropsContext.Provider>
              </div>
            </div>
            <div className="flex-none hidden w-64 pt-10 pl-8 mr-8 xl:block">
              <PageNav headings={headings} className="sticky top-24" />
            </div>
          </div>
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
    componentsProps: { [key: string]: PropItem[] }
    headings: HeadingNode[]
  }>
> {
  const { id } = ctx.params as { id: string }

  // path of the mdx file (relative to `src/docs` directory)
  const docPath = `${id}.mdx`
  const { headings, code, frontmatter } = await compileMdx(docPath)

  // generate prop type definitions
  const { components } = frontmatter
  const componentsProps = getComponentsProps(components)

  return {
    props: {
      id,
      code,
      frontmatter,
      componentsProps,
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
