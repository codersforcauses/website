import { createTRPCRouter } from "~/server/api/trpc"
import createCandidate from "./endpoints/create"
import deleteCandidate from "./endpoints/delete"
import getCandidates from "./endpoints/get"
import getCandidateByUser from "./endpoints/get-by-user"

export const candidatesInGeneralMeetingsRouter = createTRPCRouter({
  create: createCandidate,
  delete: deleteCandidate,
  get: getCandidates,
  getByUser: getCandidateByUser,
})
