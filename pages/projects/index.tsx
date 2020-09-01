import React from 'react'
import Head from 'next/head'
import Seo from 'components/Utils/SEO'
import ProjectsPage from 'components/Projects/ProjectsPage'

const Projects = () => (
  <>
    <Head>
      <title>Projects | Coders for Causes</title>
      <Seo
        title='Our Projects'
        page='projects'
        description='A list of all past and present projects.'
        image='https://og-social-cards.dankestkush.vercel.app/**.%2Fprojects**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%codersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
    </Head>
    <ProjectsPage />
  </>
)

export default Projects
