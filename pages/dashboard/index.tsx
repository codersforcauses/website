import { useEffect } from 'react'
import Router from 'next/router'
import { useUser } from '@helpers/user'
import Meta from '@components/Utils/Meta'
import DashboardPage from '@components/Dashboard/DashboardPage'

const Dashboard = () => {
  const { user } = useUser()

  useEffect(() => {
    !user && Router.replace('/membership')
  }, [user])

  return (
    <>
      <Meta
        title='Dashboard'
        name='Dashboard'
        page='dashboard'
        description='Get updates and access to CFC material.'
        image='https://og-social-cards.vercel.app/**.%2Fdashboard**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      {user && <DashboardPage user={user} />}
    </>
  )
}

export default Dashboard
