import Meta from '@components/Utils/Meta'
import ProjectsPage from '@components/Projects/ProjectsPage'

const Projects = () => (
  <>
    <Meta
      title='Projects'
      name='Our Projects'
      page='projects'
      description='A list of all past and present projects.'
      image='https://og-social-cards.vercel.app/**.%2Fprojects**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
    />
    <ProjectsPage />
  </>
)

export default Projects
