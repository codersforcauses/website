import TitleText from "../title-text"
import projectData from "data/projects.json"
import ProjectCard from "./ProjectCard"

const ProjectsPage = () => {
  return (
    <main className="main">
      <TitleText typed>./projects</TitleText>
      <div className="container">
        <div>
          <h2 className="font-mono text-3xl text-black">Our Work</h2>
          <div>
            {projectData.map((project) => (
              <ProjectCard projectDetails={project} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectsPage
