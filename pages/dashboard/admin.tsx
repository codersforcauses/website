import { useEffect } from 'react'
import Router from 'next/router'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import Meta from '@components/Utils/Meta'
import AdminDashboardPage from '@components/Dashboard/AdminDashboardPage'

const AdminDashboard = ({ id }: DashboardProps) => {
  useEffect(() => {
    !id && Router.replace('/membership')
  }, [id])

  return (
    <>
      <Meta
        title='Admin Dashboard'
        name='Admin Dashboard'
        page='admin dashboard'
        description='Manage users, projects, events and make announcements'
        image='https://og-social-cards.vercel.app/**.%2Fadmin%20dashboard**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      {id && <AdminDashboardPage />}
    </>
  )
}

export const getServerSideProps = withServerSideAuth(async ({ auth }) => ({
  props: {
    id: auth.userId || ''
  }
}))

interface DashboardProps {
  id: string
}

export default AdminDashboard
