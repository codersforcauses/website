import { ProjectModel } from "~/lib/types"

interface ProjectCardProps {
  projectDetails: ProjectModel
}

const ProjectCard = ({ projectDetails }: ProjectCardProps) => {
  return <div>{projectDetails.name}</div>
}

export default ProjectCard
