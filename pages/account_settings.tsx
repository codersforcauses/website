import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
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

  return user ? <AccountSettingsPage user={user} /> : null
}

export default AccountSettings
