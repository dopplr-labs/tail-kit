import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '@tail-kit/tail-kit/dist/tail-kit.css'
import 'styles/index.css'

export default function DocsApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/tail-kit-logo.png" type="image/png" />
        <title>Tail Kit Documentation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
