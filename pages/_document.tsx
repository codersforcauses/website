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
          {/* Font Awesome */}
          <link
            rel='stylesheet'
            href='https://use.fontawesome.com/releases/v5.8.1/css/all.css'
            integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf'
            crossOrigin='anonymous'
          />
          {/* light/dark theme favicons */}
          <link
            rel='icon'
            media='(prefers-color-scheme:dark)'
            href='/favicon-light.png'
            type='image/png'
          />
          <link
            rel='icon'
            media='(prefers-color-scheme:light)'
            href='/favicon-dark.png'
            type='image/png'
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
