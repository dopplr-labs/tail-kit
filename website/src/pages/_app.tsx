import React from 'react'
import { AppProps } from 'next/app'
import '@tail-kit/tail-kit/dist/tail-kit.css'
import 'styles/index.css'
import Head from 'next/head'

export default function DocsApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/tail-kit-logo.png" type="image/png" />
        <title>Tail Kit Documentation</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
