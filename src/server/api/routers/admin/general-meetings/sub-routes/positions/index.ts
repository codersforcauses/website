import { createTRPCRouter } from "~/server/api/trpc"
import createPositions from "./endpoints/create"
import listPositionsForMeeting from "./endpoints/list-for-meeting"
import updatePositionsForMeeting from "./endpoints/update-for-meeting"

export const positionsInGeneralMeetingsAdminRouter = createTRPCRouter({
  create: createPositions,
  listForMeeting: listPositionsForMeeting,
  updateForMeeting: updatePositionsForMeeting,
})
