import React from 'react'
import { AppProps } from 'next/app'
import '@tail-kit/tail-kit/dist/tail-kit.css'

function DocApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default DocApp
