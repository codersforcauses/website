import { type Metadata } from "next"
import ProjectsPage from "../_components/projects/page"

export const metadata: Metadata = {
  title: "Projects",
}
const Projects = () => {
  return (
    <>
      <ProjectsPage />
    </>
  )
}

export default Projects
