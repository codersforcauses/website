import { createTRPCRouter } from "~/server/api/trpc"

import { create } from "./create"
import { getProjectById } from "./get-project-by-id"
import { getProjects } from "./get-projects"
import { update } from "./update"
import { updateMember } from "./update-member"

export const projectsAdminRouter = createTRPCRouter({
  create,
  getProjects,
  update,
  getProjectById,
  updateMember,
})
