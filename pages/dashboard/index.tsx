import React, { useContext, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import DashboardPage from 'components/Dashboard/DashboardPage'
import { UserContext } from 'helpers/user'

const Dashboard = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user === undefined) Router.replace('/membership')
  }, [user])

  return user ? (
    <>
      <Head>
        <title>Dashboard | Coders for Causes</title>
        <meta
          name='description'
          content='Coders for Causes is a not for profit organisation that empowers charities and other not for profit organisations by connecting them with university students to develop technical solutions. We are a student-run club based in Perth, Western Australia with a wide range of clients. Whether you are looking for technical advice or a long term project, get in touch with us for more information.'
        />
        <meta
          property='og:image'
          content='hhttps://og-social-cards.dankestkush.vercel.app/**.%2Fdashboard**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fwebsite.codersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
        />
        <meta property='og:title' content='Dashboard' />
        <meta property='og:description' content='Get updates and access to CFC material.' />

        <meta property='og:site_name' content='Coders for Causes' />
      </Head>
      <DashboardPage />
    </>
  ) : null
}

export default Dashboard
