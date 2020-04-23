import App, { AppProps } from 'next/app'
import { ThemeProvider } from 'emotion-theming'
import React, { useContext, useEffect } from 'react'
import Amplify from 'aws-amplify'
import User from '../components/Auth/User'
import { initAnalytics } from '../helpers/analytics'
import { initMessenger } from '../helpers/messenger'
import { theme } from '../lib/theme'
import '../theme.scss'

Amplify.configure({
  aws_project_region: process.env.AMPLIFY_AWS_COGNITO_REGION,
  aws_cognito_region: process.env.AMPLIFY_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.AMPLIFY_AWS_COGNITO_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.AMPLIFY_AWS_COGNITO_WEB_CLIENT_ID,
  oauth: {
    domain: process.env.AMPLIFY_OAUTH_DOMAIN,
    scope: [
      'phone',
      'email',
      'openid',
      'profile',
      'aws.cognito.signin.user.admin'
    ],
    redirectSignIn: `${process.env.BASE_URL}/signin/`,
    redirectSignOut: process.env.BASE_URL,
    responseType: 'token'
  },
  federationTarget: 'COGNITO_USER_POOLS',
  authenticationFlowType: 'USER_PASSWORD_AUTH'
})

const Website = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      initAnalytics('2423121134')
      initMessenger()
    }
  }, [])

  return (
    <User>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        {process.env.NODE_ENV !== 'development' && (
          <>
            <div id='fb-root' />
            <div
              className='fb-customerchat'
              data-theme_color='#000000'
              data-page_id='700598980115471'
              data-logged_in_greeting='Hi there! How can we help you?'
              data-logged_out_greeting='Please log in to chat with us'
            />
          </>
        )}
      </ThemeProvider>
    </User>
  )
}

Website.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default Website
