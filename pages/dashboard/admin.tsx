import { useEffect } from 'react'
import Router from 'next/router'
import { useUser } from '@helpers/user'
import Meta from '@components/Utils/Meta'
import AdminDashboardPage from '@components/Dashboard/AdminDashboardPage'

const AdminDashboard = () => {
  const { user } = useUser()

  useEffect(() => {
    !user && Router.replace('/membership')
  }, [user])

  return (
    <>
      <Meta
        title='Admin Dashboard'
        name='Admin Dashboard'
        page='admin dashboard'
        description='Manage users and their roles'
        image='https://og-social-cards.vercel.app/**.%2Fadmin%20dashboard**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      {user && <AdminDashboardPage />}
    </>
  )
}

export default AdminDashboard
