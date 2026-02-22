import { createTRPCRouter } from "~/server/api/trpc"
import getPositions from "./endpoints/get"
import getPositionsWithCounts from "./endpoints/get-with-counts"
import getCandidatesForPosition from "./endpoints/get-candidates-for-position"

export const positionsInGeneralMeetingsRouter = createTRPCRouter({
  get: getPositions,
  getWithCounts: getPositionsWithCounts,
  getCandidates: getCandidatesForPosition,
})
