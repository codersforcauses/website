import { createTRPCRouter } from "~/server/api/trpc"
import createQuestions from "./endpoints/create"
import deleteQuestion from "./endpoints/delete"
import updateQuestion from "./endpoints/update"

export const questionsInGeneralMeetingsAdminRouter = createTRPCRouter({
  create: createQuestions,
  delete: deleteQuestion,
  update: updateQuestion,
})
