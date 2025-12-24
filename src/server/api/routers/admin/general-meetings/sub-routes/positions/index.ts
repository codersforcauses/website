import { createTRPCRouter } from "~/server/api/trpc"
import createPositions from "./endpoints/create"

export const positionsInGeneralMeetingsAdminRouter = createTRPCRouter({
  create: createPositions,
})
