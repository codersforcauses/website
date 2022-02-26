import { useEffect } from 'react'
import Router from 'next/router'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import Meta from '@components/Utils/Meta'
import ProjectApplicationPage from '@components/Projects/ProjectApplicationPage'

const ProjectApplication = ({ id }: ProjectApplicationProps) => {
  useEffect(() => {
    !id && Router.replace('/membership')
  }, [id])

  return (
    <>
      <Meta
        title='Projects'
        name='Our Projects'
        page='projects'
        description='A list of all past and present projects.'
        image='https://og-social-cards.vercel.app/**.%2Fprojects**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      {id && <ProjectApplicationPage />}
    </>
  )
}

export const getServerSideProps = withServerSideAuth(({ auth }) => ({
  props: {
    id: auth.userId || ''
  }
}))

interface ProjectApplicationProps {
  id: string
}

export default ProjectApplication
