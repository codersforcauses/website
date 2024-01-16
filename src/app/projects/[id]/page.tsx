"use client"

import { type ProjectModel } from "~/lib/types"
import { QueryFunctionContext, useQuery } from "@tanstack/react-query"

const ProjectPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery(["project", id], fetchProject)

  if (isLoading) {
    return (
      <main className="main">
        <div>loading</div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="main">
        <div>Error fetching data</div>
      </main>
    )
  }

  return (
    <main className="main">
      <div>{project.name}</div>
    </main>
  )
}

async function fetchProject(context: QueryFunctionContext<string[]>) {
  const id = context.queryKey[1]
  const response = await fetch(`/api/projects/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch project")
  }

  const data: ProjectModel = (await response.json()) as ProjectModel

  return data
}

export default ProjectPage
