import TitleText from "../title-text"
import projectData from "data/projects.json"
import ProjectCard from "./ProjectCard"

const ProjectsPage = () => {
  return (
    <main className="main">
      <TitleText typed>./projects</TitleText>
      <div className="container">
        <div>
          <div className="grid gap-16 py-6 md:grid-cols-3">
            {projectData.map((project) => (
              <ProjectCard project={project} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectsPage
