import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en-AU'>
        <Head>
          {process.env.NODE_ENV === 'production' && (
            <>
              <link
                rel='preconnect'
                href='https://connect.facebook.net'
                crossOrigin=''
              />
              <link rel='dns-prefetch' href='//connect.facebook.net' />
            </>
          )}

          {/* Typefaces from Google Fonts */}
          <link
            href='https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans|Material+Icons+Sharp&display=swap'
            rel='stylesheet'
          />

          <link rel='icon' href='/favicon-light.png' type='image/png' />
          <meta name='author' content='Coders for Causes' />
        </Head>
        <body className='loading'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
