import TitleText from "../_components/title-text"
import projectData from "data/projects.json"

const Projects = () => {
  return (
    <main>
      <TitleText>./projects</TitleText>
      <div className="container">
        <div>
          <h2 className="font-mono text-3xl text-black">Our Work</h2>
          <div>
            {/* {projectData.map((project) => (
              // <ProjectCard />
            ))} */}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Projects
