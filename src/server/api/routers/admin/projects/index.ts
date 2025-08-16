import { createTRPCRouter } from "~/server/api/trpc"

import { create } from "./create"
import { deleteProject } from "./delete"
import { getProjectById } from "./get-project-by-id"
import { getProjects } from "./get-projects"
import { update } from "./update"

export const projectsAdminRouter = createTRPCRouter({
  create,
  getProjects,
  update,
  getProjectById,
  deleteProject,
})
