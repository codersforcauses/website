import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => App,
        enhanceComponent: Component => Component
      })

    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta
            name='robots'
            content='index, follow, max-snippet:30, max-image-preview:large'
          />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com/'
            crossOrigin=''
          />
          <link
            rel='preconnect'
            href='https://kit-free.fontawesome.com'
            crossOrigin=''
          />
          <link
            rel='preconnect'
            href='https://connect.facebook.net'
            crossOrigin=''
          />
          <link
            rel='preconnect'
            href='https://scontent.fper5-1.fna.fbcdn.net'
            crossOrigin=''
          />
          <link rel='preconnect' href='https://unsplash.it' crossOrigin='' />

          <link rel='dns-prefetch' href='//fonts.gstatic.com/' />
          <link rel='dns-prefetch' href='//kit-free.fontawesome.com' />
          <link rel='dns-prefetch' href='//connect.facebook.net' />
          <link rel='dns-prefetch' href='//scontent.fper5-1.fna.fbcdn.net' />
          <link rel='dns-prefetch' href='//unsplash.it' />

          {/* Typefaces from Google Fonts */}
          <link
            href='https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans|Material+Icons+Sharp&display=swap'
            rel='stylesheet'
          />

          {/* Font Awesome */}
          <script
            src='https://kit.fontawesome.com/249aebb7ef.js'
            crossOrigin='anonymous'
            defer
          />
          <link rel='icon' href='/favicon-light.png' type='image/png' />
        </Head>
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    )
  }
}

export default MyDocument
