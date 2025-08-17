import { clerkClient } from "@clerk/nextjs/server"
import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"

export const rollbackClerk = publicRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
  .input(
    z.object({
      clerk_id: z
        .string()
        .min(2, {
          message: "Clerk ID is required",
        })
        .trim(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      await clerkClient().users.deleteUser(input.clerk_id)
    } catch (err) {
      console.error("Failed to delete Clerk user", err)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `No Clerk customer found with id: ${input.clerk_id} during rollback`,
      })
    }
    return { success: true }
  })
