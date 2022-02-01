import { withServerSideAuth } from '@clerk/nextjs/ssr'
import Meta from '@components/Utils/Meta'
import DashboardPage from '@components/Dashboard/DashboardPage'

const Dashboard = () => {
  return (
    <>
      <Meta
        title='Dashboard'
        name='Dashboard'
        page='dashboard'
        description='Get updates and access to CFC material.'
        image='https://og-social-cards.vercel.app/**.%2Fdashboard**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      <DashboardPage />
    </>
  )
}

export const getServerSideProps = withServerSideAuth(async ({ auth }) => {
  const { userId } = auth

  if (!userId)
    return {
      redirect: {
        destination: '/membership',
        permanent: false
      }
    }

  return {
    props: {}
  }
})

export default Dashboard
