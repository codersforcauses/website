import { createTRPCRouter } from "~/server/api/trpc"

import { getApplicationOpen } from "./get-application-open"
import { getProjectByName, getProjectByUser } from "./get-projects"
import { getPublic } from "./get-public"

export const projectsRouter = createTRPCRouter({
  getApplicationOpen,
  getPublic,
  getProjectByName,
  getProjectByUser,
})
