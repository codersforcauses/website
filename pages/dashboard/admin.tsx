import { withServerSideAuth } from '@clerk/nextjs/ssr'
import Meta from '@components/Utils/Meta'
import AdminDashboardPage from '@components/Dashboard/AdminDashboardPage'

const AdminDashboard = () => (
  <>
    <Meta
      title='Admin Dashboard'
      name='Admin Dashboard'
      page='admin dashboard'
      description='Manage users, projects, events and make announcements'
      image='https://og-social-cards.vercel.app/**.%2Fadmin%20dashboard**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
    />
    <AdminDashboardPage />
  </>
)

export const getServerSideProps = withServerSideAuth(({ req: { auth } }) => {
  const { sessionId } = auth

  return {
    ...(!sessionId
      ? { redirect: { destination: '/membership', permanent: false } }
      : { props: {} })
  }
})

export default AdminDashboard
