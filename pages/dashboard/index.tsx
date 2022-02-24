import { useEffect } from 'react'
import Router from 'next/router'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import Meta from '@components/Utils/Meta'
import DashboardPage from '@components/Dashboard/DashboardPage'

const Dashboard = ({ id }: DashboardProps) => {
  useEffect(() => {
    !id && Router.replace('/membership')
  }, [id])

  return (
    <>
      <Meta
        title='Dashboard'
        name='Dashboard'
        page='dashboard'
        description='Get updates and access to CFC material.'
        image='https://og-social-cards.vercel.app/**.%2Fdashboard**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      {id && <DashboardPage />}
    </>
  )
}

export const getServerSideProps = withServerSideAuth(({ auth }) => ({
  props: {
    id: auth.userId || ''
  }
}))

interface DashboardProps {
  id: string
}

export default Dashboard
