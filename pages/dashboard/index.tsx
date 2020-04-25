import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import PageContainer from 'components/PageContainer'
import DashboardPage from 'components/Dashboard/DashboardPage'
import { UserContext } from 'helpers/user'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (!user) Router.replace('/membership')
  }, [])

  return (
    user && (
      <PageContainer>
        <DashboardPage />
      </PageContainer>
    )
  )
}

export default Dashboard
