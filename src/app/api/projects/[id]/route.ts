import projects from "data/projects.json"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } },
) {
  const project = projects.find((project) => id === project.id)

  if (!project) {
    return new NextResponse(null, { status: 404 })
  }

  return new NextResponse(JSON.stringify(project), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
