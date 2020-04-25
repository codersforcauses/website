import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import PageContainer from 'components/PageContainer'
import AccountSettingsPage from 'components/Auth/AccountSettingsPage'
import { UserContext } from 'helpers/user'

const AccountSettings = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        //   Router.replace({
        //     pathname: '/membership',
        //     query: { name: '/account_settings' }
        //   })
        console.log(user)
      }
    }, 500)
  }, [user])
  // console.log(user)

  return (
    user && (
      <PageContainer>
        <AccountSettingsPage />
      </PageContainer>
    )
  )
}

export default AccountSettings
