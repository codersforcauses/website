import { createTRPCRouter } from "~/server/api/trpc"

import { create } from "./create"
import { getAll } from "./get-all"
import { getProjectById } from "./get-by-id"
import { update } from "./update"

export const projectsAdminRouter = createTRPCRouter({
  create,
  getAll,
  update,
  getProjectById,
})
