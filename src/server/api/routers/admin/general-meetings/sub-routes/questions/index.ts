import { createTRPCRouter } from "~/server/api/trpc"
import createQuestions from "./endpoints/create"

export const questionsInGeneralMeetingsAdminRouter = createTRPCRouter({
  create: createQuestions,
})
