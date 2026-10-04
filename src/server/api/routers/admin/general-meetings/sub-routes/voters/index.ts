import { createTRPCRouter } from "~/server/api/trpc"
import listVotersForMeeting from "./endpoints/list"

export const votersInGeneralMeetingsAdminRouter = createTRPCRouter({
  list: listVotersForMeeting,
})
