import { GetServerSideProps } from 'next'
import Meta from '@components/Utils/Meta'
import ProjectPage, { ProjectType } from '@components/Projects/ProjectPage'
import projects from '@data/projects.json'

const Project = ({ project }: { project: ProjectType }) => (
  <>
    <Meta
      title={project.id}
      name={`Project: ${project.id}`}
      page={project.purl.slice(1)}
      description={project.desc}
      image={`https://og-social-cards.vercel.app/**.%2F${project.id}**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg`}
    />
    <ProjectPage data={project} />
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const project = projects.find(
    project => project.purl === `/projects/${params?.slug}`
  )

  return project ? { props: { project } } : { notFound: true }
}

export default Project
