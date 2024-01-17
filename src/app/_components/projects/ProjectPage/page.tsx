"use client"

import { ProjectModel } from "~/lib/types"
import { QueryFunctionContext, useQuery } from "@tanstack/react-query"
import NotFound from "~/app/not-found"
import { Suspense } from "react"

interface ProjectPageProps {
  projectId: string
}

const ProjectPage = ({ projectId }: ProjectPageProps) => {
  const { data: project, isError } = useQuery(
    ["project", projectId],
    fetchProject,
  )

  if (isError) {
    return <NotFound />
  }

  return (
    <>
      {project && (
        <div>
          <div>{project.name}</div>
          <div>{project.id}</div>
          <div>{project.client}</div>
        </div>
      )}
    </>
  )
}

async function fetchProject(context: QueryFunctionContext<string[]>) {
  const id = context.queryKey[1]
  const response = await fetch(`/api/projects/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch project")
  }

  const data = (await response.json()) as ProjectModel

  return data
}

export default ProjectPage
