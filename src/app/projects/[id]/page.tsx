"use client"

import { type ProjectModel } from "~/lib/types"
import { useEffect, useState } from "react"

const ProjectPage = ({ params: { id } }: { params: { id: string } }) => {
  const [project, setProject] = useState<ProjectModel | null>(null)
  console.log(id)

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((response) => {
        return response.json()
      })
      .then((data: ProjectModel) => setProject(data))
      .catch((error) => console.error(error))
  }, [id])

  if (!project) {
    return <div>hi...</div>
  }

  return (
    <main className="main">
      <div>{project.name}</div>
    </main>
  )
}

export default ProjectPage
