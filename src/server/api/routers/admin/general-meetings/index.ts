import { createTRPCRouter } from "~/server/api/trpc"
import { positionsInGeneralMeetingsAdminRouter } from "./sub-routes/positions"
import { questionsInGeneralMeetingsAdminRouter } from "./sub-routes/questions"
import createMeeting from "./endpoints/create-meeting"

export const generalMeetingsAdminRouter = createTRPCRouter({
  positions: positionsInGeneralMeetingsAdminRouter,
  questions: questionsInGeneralMeetingsAdminRouter,

  create: createMeeting,
})
