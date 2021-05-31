import { ThemeProvider as EmotionTheme, Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useEffect, useCallback, useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { Auth } from '@aws-amplify/auth'
import dayjs from 'dayjs'
import User from '@components/Auth/User'
import Header from '@components/Utils/Header'
import Footer from '@components/Utils/Footer'
import { theme } from '@lib/theme'
import '@styles/main.css'
import '@styles/chrome-bug.css'
import { globalStyle } from 'GlobalStyles' // TODO remove after reactstrap and emotion removed
import 'dayjs/locale/en-au'
// import 'theme.scss'

const AddOns = dynamic(() => import('../components/Utils/AddOns'), {
  ssr: false
})

dayjs.locale('en-au')

Auth.configure({
  aws_project_region: process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_USER_POOLS_ID,
  aws_user_pools_web_client_id:
    process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_WEB_CLIENT_ID,
  authenticationFlowType: 'USER_PASSWORD_AUTH'
})

const Website = ({ Component, pageProps }: AppProps) => {
  const [isDark, setDark] = useState<boolean | undefined>(undefined)
  const toggleDark = useCallback(() => {
    setDark(previousDark => !previousDark)
  }, [])

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  useEffect(() => {
    setDark(
      (localStorage.getItem('dark-theme') ??
        window
          .matchMedia('(prefers-color-scheme: dark)')
          ?.matches.toString()) === 'true'
    )
  }, [])

  return (
    <User>
      <ThemeProvider attribute='class'>
        <EmotionTheme theme={theme}>
          <Global styles={globalStyle(theme, isDark)} />
          <Header handleDarkToggle={toggleDark} />
          <main className='main'>
            <Component {...pageProps} />
          </main>
          <Footer />
          <AddOns />
        </EmotionTheme>
      </ThemeProvider>
    </User>
  )
}

export default Website
