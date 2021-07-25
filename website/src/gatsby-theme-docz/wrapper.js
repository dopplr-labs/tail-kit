import React from 'react'
import { Helmet } from 'react-helmet-async'

// The doc prop contains some metadata about the page being rendered that you can use.
const Wrapper = ({ children }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>tail-kit docs</title>
        <link
          rel="icon"
          type="image/ico"
          href="https://tail-kit.netlify.app/images/tail-kit-logo.ico"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tailwindcss/typography@0.4.x/dist/typography.min.css"
        />
      </Helmet>
      {children}
    </React.Fragment>
  )
}

export default Wrapper
