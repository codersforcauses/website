import App, { AppProps } from 'next/app'
import { ThemeProvider } from 'emotion-theming'
import { useEffect } from 'react'
import { initAnalytics } from '../helpers/analytics'
import { initMessenger } from '../helpers/messenger'
import { theme } from '../lib/theme'
import '../theme.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    initAnalytics('2423121134')
    initMessenger()
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <div id='fb-root' />
      <div
        className='fb-customerchat'
        data-theme_color='#000000'
        data-page_id='700598980115471'
        data-logged_in_greeting='Hi there! How can we help you?'
        data-logged_out_greeting='Please log in to chat with us'
      />
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
