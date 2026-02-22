import { createTRPCRouter } from "~/server/api/trpc"
import createPositions from "./endpoints/create"
import deletePosition from "./endpoints/delete"
import updatePosition from "./endpoints/update"

export const positionsInGeneralMeetingsAdminRouter = createTRPCRouter({
  create: createPositions,
  delete: deletePosition,
  update: updatePosition,
})
