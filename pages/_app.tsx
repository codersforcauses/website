import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { Amplify } from 'aws-amplify'
import dayjs from 'dayjs'
import User from '@components/Auth/User'
import Header from '@components/Utils/Header'
import Footer from '@components/Utils/Footer'
import '@styles/main.css'
import '@styles/chrome-bug.css'
import 'dayjs/locale/en-au'

const AddOns = dynamic(() => import('../components/Utils/AddOns'), {
  ssr: false
})

dayjs.locale('en-au')

Amplify.configure({
  aws_project_region: process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_USER_POOLS_ID,
  aws_user_pools_web_client_id:
    process.env.NEXT_PUBLIC_AMPLIFY_AWS_COGNITO_WEB_CLIENT_ID,
  authenticationFlowType: 'USER_PASSWORD_AUTH',
  ssr: true
})

const Website = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <User>
      <ThemeProvider attribute='class'>
        <Header />
        <main className='main'>
          <Component {...pageProps} />
        </main>
        <Footer />
        {process.env.NODE_ENV === 'production' && <AddOns />}
      </ThemeProvider>
    </User>
  )
}

export default Website
