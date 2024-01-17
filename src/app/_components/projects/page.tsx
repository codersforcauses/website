"use client"

import TitleText from "../title-text"
import projectData from "data/projects.json"
import ProjectCard from "./ProjectCard/page"
import ProjectProcessModal from "./ProjectProcessModal/page"

const ProjectsPage = () => {
  return (
    <main className="main dark:bg-alt-dark">
      <TitleText typed>./projects</TitleText>
      <div className="container">
        <div className="flex flex-col md:flex-row md:gap-16">
          <div className="flex-grow">
            <div className="grid gap-16 py-6 md:grid-cols-3">
              {projectData.map((project) => (
                <ProjectCard project={project} />
              ))}
            </div>
          </div>
          <div className="mt-6 text-primary dark:text-white md:w-1/4">
            <ProjectProcessModal />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectsPage
