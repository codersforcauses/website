import React from 'react'
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext
} from 'next/document'
import '../theme.scss'

export default class MyDocument extends Document {
  static async getInitialProps (ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

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
