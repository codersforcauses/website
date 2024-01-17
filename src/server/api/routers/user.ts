import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { users } from "~/server/db/schema"

export const userRouter = createTRPCRouter({
  create: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(users).values({
      name: input.name,
      createdById: ctx.session.user.id,
    })
  }),
})
