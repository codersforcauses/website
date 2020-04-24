import React, { useContext } from 'react'
import PageContainer from 'components/PageContainer'
import AccountSettingsPage from 'components/Auth/AccountSettingsPage'
import Membership from 'pages/membership'
import { UserContext } from 'helpers/user'

const AccountSettings = () => {
  const { user } = useContext(UserContext)
  return user ? (
    <PageContainer>
      <AccountSettingsPage />
    </PageContainer>
  ) : (
    <Membership noRedirect />
  )
}

export default AccountSettings
