import { useEffect } from 'react'
import Router from 'next/router'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import Meta from '@components/Utils/Meta'
import ProjectApplicationPage from '@components/Projects/ProjectApplicationPage'

const ProjectApplication = () => (
  <>
    <Meta
      title='Projects'
      name='Our Projects'
      page='projects'
      description='A list of all past and present projects.'
      image='https://og-social-cards.vercel.app/**.%2Fprojects**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
    />
    <ProjectApplicationPage />
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

export default ProjectApplication
