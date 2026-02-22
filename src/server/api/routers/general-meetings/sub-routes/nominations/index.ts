import { createTRPCRouter } from "~/server/api/trpc"
import createNomination from "./endpoints/create"
import deleteNomination from "./endpoints/delete"
import getNominations from "./endpoints/get"
import getNominationsByCandidate from "./endpoints/get-by-candidate"

export const nominationsInGeneralMeetingsRouter = createTRPCRouter({
  create: createNomination,
  delete: deleteNomination,
  get: getNominations,
  getByCandidate: getNominationsByCandidate,
})
