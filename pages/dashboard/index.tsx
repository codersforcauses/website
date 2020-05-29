import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import DashboardPage from 'components/Dashboard/DashboardPage'
import { UserContext } from 'helpers/user'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user === undefined) Router.replace('/membership')
  }, [user])

  return user ? <DashboardPage /> : null
}

export default Dashboard
