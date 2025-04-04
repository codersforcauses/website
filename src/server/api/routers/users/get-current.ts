import { Ratelimit } from "@upstash/ratelimit"
import { protectedRatedProcedure } from "~/server/api/trpc"

export const getCurrent = protectedRatedProcedure(Ratelimit.fixedWindow(40, "30s")).query(async ({ ctx }) => {
  const currentUser = ctx.user
  return currentUser
})
