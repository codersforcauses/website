import { ThemeProvider, Global } from '@emotion/react'
import { AppProps } from 'next/app'
import { useEffect, useContext, useCallback, useState } from 'react'
import { Auth } from '@aws-amplify/auth'
import dayjs from 'dayjs'
import User from 'components/Auth/User'
import Header from 'components/Utils/Header'
import Footer from 'components/Utils/Footer'
import { initAnalytics } from 'helpers/analytics'
import { initMessenger } from 'helpers/messenger'
import { UserContext, DarkProvider } from 'helpers/user'
import { theme } from 'lib/theme'
import { globalStyle } from 'GlobalStyles'
import 'dayjs/locale/en-au'
import 'theme.scss'
import { Alert, Container } from 'reactstrap'

dayjs.locale('en-au')

Auth.configure({
  aws_project_region: process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_USER_POOLS_ID,
  aws_user_pools_web_client_id:
    process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_WEB_CLIENT_ID,
  authenticationFlowType: 'USER_PASSWORD_AUTH'
})

const AddOns = () => {
  const { user } = useContext(UserContext)

  return (
    process.env.NODE_ENV === 'production' && (
      <>
        <div id='fb-root' />
        <div
          className='fb-customerchat'
          data-theme_color='#000000'
          data-page_id='700598980115471'
          data-logged_in_greeting={`Hi ${
            user?.given_name ?? 'there'
          }! How can we help you?`}
          data-logged_out_greeting='Please log into facebook to chat with us'
          data-greeting_dialog_display='fade'
        />
      </>
    )
  )
}

const Website = ({ Component, pageProps }: AppProps) => {
  const [isDark, setDark] = useState(undefined)
  const toggleDark = useCallback(() => {
    setDark(previousDark => !previousDark)
  }, [])

  useEffect(() => {
    setDark(
      (localStorage.getItem('dark-theme') ??
        window
          .matchMedia('(prefers-color-scheme: dark)')
          ?.matches.toString()) === 'true'
    )
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      initAnalytics('2423121134')
      initMessenger()
      setTimeout(() => {
        document.getElementsByTagName('iframe')[0].title =
          'Coders for Causes FaceBook Messenger Plugin'
      }, 2000)
    }
  }, [])

  return (
    <User>
      <DarkProvider value={isDark}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyle(theme, isDark)} />
          <Header handleDarkToggle={toggleDark} />
          <main className='main'>
            {/* TODO remove once MVP is finished */}
            {/* <Alert
                color='warning'
                className='fixed-top rounded-0 px-0 py-md-3'
                style={{ marginTop: '64px', zIndex: 3 }}
              >
                <Container>
                  This website is still under development. Not everything may
                  work, but feel free to look around.
                </Container>
              </Alert> */}
            <Component {...pageProps} />
          </main>
          <Footer />
          <AddOns />
        </ThemeProvider>
      </DarkProvider>
    </User>
  )
}

export default Website
