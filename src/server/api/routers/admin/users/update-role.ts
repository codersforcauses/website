import { TRPCError } from "@trpc/server"
import { addYears } from "date-fns"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { NAMED_ROLES } from "~/lib/constants"
import { adminProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const updateRole = adminProcedure
  .input(
    z.object({
      id: z.string().min(2, {
        message: "User ID is required",
      }),
      role: z.enum(NAMED_ROLES).nullable(),
      paymentID: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const [user] = await ctx.db.update(User).set({ role: input.role }).where(eq(User.id, input.id)).returning()

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: `User with id: ${input.id} does not exist` })
    }

    if (input.role === "member") {
      await ctx.db
        .update(User)
        .set({ membership_expiry: addYears(new Date(), 1) })
        .where(eq(User.id, input.id))
    }

    return user
  })
