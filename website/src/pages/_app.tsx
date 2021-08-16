import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '@tail-kit/tail-kit/dist/tail-kit.css'
import { MessageProvider } from '@tail-kit/tail-kit'
import 'styles/index.css'
import DocShell from 'components/doc-shell'
import { DeviceSizeProvider } from 'hooks/use-device-size'

export default function DocsApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tail Kit</title>
        <link rel="icon" href="/tail-kit-logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Tail Kit" />
        <meta
          property="og:description"
          content="UI kit for React, built using tailwindcss"
        />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <DeviceSizeProvider>
        <MessageProvider>
          <DocShell>
            <Component {...pageProps} />
          </DocShell>
        </MessageProvider>
      </DeviceSizeProvider>
    </>
  )
}
