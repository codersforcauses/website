import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          {/* Typefaces from Google Fonts */}
          <link
            href='https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
