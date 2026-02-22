import { createTRPCRouter } from "~/server/api/trpc"
import createAnswer from "./endpoints/create"
import deleteAnswer from "./endpoints/delete"
import getAnswersByCandidate from "./endpoints/get-by-candidate"
import updateAnswer from "./endpoints/update"

export const answersInGeneralMeetingsRouter = createTRPCRouter({
  create: createAnswer,
  delete: deleteAnswer,
  update: updateAnswer,
  getAnswersByCandidate: getAnswersByCandidate,
})
