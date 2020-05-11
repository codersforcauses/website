import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import PageContainer from 'components/PageContainer'
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
    <PageContainer>
      <AccountSettingsPage user={user} />
    </PageContainer>
  ) : null
}

export default AccountSettings
