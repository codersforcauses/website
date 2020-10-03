import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Seo from 'components/Utils/SEO'
import DashboardPage from 'components/Dashboard/DashboardPage'
import { UserContext } from 'helpers/user'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user === undefined) Router.replace('/membership')
  }, [user])

  return (
    <>
      <Head>
        <title>Dashboard | Coders for Causes</title>
        <Seo
          title='Dashboard'
          page='dashboard'
          description='Get updates and access to CFC material.'
          image='https://og-social-cards.vercel.app/**.%2Fdashboard**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
        />
      </Head>
      {user && <DashboardPage />}
    </>
  )
}

export default Dashboard
