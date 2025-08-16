import { createTRPCRouter } from "~/server/api/trpc"

import { getApplicationOpen } from "./get-application-open"
import { getProjectByName } from "./get-project-by-name"
import { getPublic } from "./get-public"

export const projectsRouter = createTRPCRouter({
  getApplicationOpen,
  getPublic,
  getProjectByName,
})
