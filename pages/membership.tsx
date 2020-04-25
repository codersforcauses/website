import React, { useContext, useEffect } from 'react'
import PageContainer from 'components/PageContainer'
import AuthWrapper from 'components/Auth/AuthWrapper'
import { UserContext } from 'helpers/user'
import Router from 'next/router'

const Membership = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user) {
      Router.replace('/dashboard')
    }
  }, [])

  return (
    !user && (
      <PageContainer>
        <AuthWrapper />
      </PageContainer>
    )
  )
}

export default Membership
