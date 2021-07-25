import React from 'react'
import { AppProps } from 'next/app'
import '@tail-kit/tail-kit/dist/tail-kit.css'
import 'styles/index.css'

export default function DocsApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
