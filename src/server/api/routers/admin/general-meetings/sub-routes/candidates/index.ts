import { createTRPCRouter } from "~/server/api/trpc"
import create from "./endpoints/create"
import listQuestionsForMeeting from "./endpoints/list-for-meeting"

export const candidatesInGeneralMeetingsAdminRouter = createTRPCRouter({
  create,
  listForMeeting: listQuestionsForMeeting,
})
