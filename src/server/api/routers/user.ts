import { eq, or, sql } from "drizzle-orm"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { users } from "~/server/db/schema"

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        clerk_id: z.string().min(2, {
          message: "Clerk ID is required",
        }),
        name: z.string().min(2, {
          message: "Name is required",
        }),
        preferred_name: z.string().min(2, {
          message: "Preferred name is required",
        }),
        email: z
          .string()
          .email({
            message: "Invalid email address",
          })
          .min(2, {
            message: "Email is required",
          }),
        pronouns: z.string().min(2, {
          message: "Pronouns are required",
        }),
        student_number: z.string().optional(),
        uni: z.string().optional(),
        github: z.string().optional(),
        discord: z.string().optional(),
        subscribe: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.insert(users).values({
        id: input.clerk_id,
        name: input.name,
        preferred_name: input.preferred_name,
        email: input.email,
        pronouns: input.pronouns,
        student_number: input.student_number,
        university: input.uni,
        github: input.github,
        discord: input.discord,
        subscribe: input.subscribe ?? true,
      })
      return user
    }),

  getUser: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.select().from(users).where(eq(users.id, input))
  }),

  updateRole: protectedProcedure
    .input(
      z.object({
        role: z.enum(["member", "committee", "executive", "past", "honorary", "admin"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.update(users).set({ role: input.role }).where(eq(users.id, ctx.user?.id))
      console.log(user)

      return user
    }),
})
