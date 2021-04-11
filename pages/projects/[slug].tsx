import Head from 'next/head'
import ProjectPage from 'components/Projects/ProjectPage'
import projects from 'data/projects.json'
import type { ProjectType } from 'components/Projects/ProjectPage'

const Project = ({ project }: { project: ProjectType }) => {
  return (
    <>
      <Head>
        <title>Project: Coders for Causes</title>
        <meta
          name='description'
          content='Coders for Causes is a not for profit organisation that empowers charities and other not for profit organisations by connecting them with university students to develop technical solutions. We are a student-run club based in Perth, Western Australia with a wide range of clients. Whether you are looking for technical advice or a long term project, get in touch with us for more information.'
        />
      </Head>
      <ProjectPage data={project} />
    </>
  )
}

export const getServerSideProps = ({ params }) => {
  const project: ProjectType = projects.find(
    project => project.id === params.slug
  )

  return project ? { props: { project } } : { notFound: true }
}

export default Project
