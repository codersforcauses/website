import { createTRPCRouter } from "~/server/api/trpc"
import getQuestions from "./endpoints/get"

export const questionsInGeneralMeetingsRouter = createTRPCRouter({
  get: getQuestions,
})
