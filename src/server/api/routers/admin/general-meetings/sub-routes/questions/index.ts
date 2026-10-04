import { createTRPCRouter } from "~/server/api/trpc"
import createQuestions from "./endpoints/create"
import listQuestionsForMeeting from "./endpoints/list-for-meeting"
import updateQuestionsForMeeting from "./endpoints/update-for-meeting"

export const questionsInGeneralMeetingsAdminRouter = createTRPCRouter({
  create: createQuestions,
  listForMeeting: listQuestionsForMeeting,
  updateForMeeting: updateQuestionsForMeeting,
})
