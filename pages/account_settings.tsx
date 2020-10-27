import * as React from 'react'
import { useContext, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
// import Seo from 'components/Utils/SEO'
import AccountSettingsPage from 'components/Auth/AccountSettingsPage'
import { UserContext } from 'helpers/user'

const AccountSettings = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user === undefined) {
      Router.replace({
        pathname: '/membership',
        query: { name: '/account_settings' }
      })
    }
  }, [user])

  return user ? (
    <>
      <Head>
        <title>Account Settings | Coders for Causes</title>
        {/* <Seo
          title='Edit your account'
          page='account_settings'
          description='Customise your personal preferences and settings'
          image='https://og-social-cards.vercel.app/**.%2Fsettings**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
        /> */}
      </Head>
      <AccountSettingsPage user={user} />
    </>
  ) : null
}

export default AccountSettings
