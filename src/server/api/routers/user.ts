import { TRPCError } from "@trpc/server"
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

  login: protectedProcedure.mutation(async ({ ctx }) => {
    const id = ctx.user?.id
    const [user] = await ctx.db.select().from(users).where(eq(users.id, id))
    return user
  }),

  getUser: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.select().from(users).where(eq(users.id, input))
  }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const userList = await ctx.db.select().from(users)

    return userList.map(({ updatedAt, ...user }) => user)
  }),

  updateRole: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        role: z.enum(["member", "committee", "past", "honorary", "admin"]).nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user.id)
        throw new TRPCError({ code: "UNAUTHORIZED", message: "You must be logged in to update your details" })

      const [currentUser] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id))
      if (!currentUser)
        throw new TRPCError({ code: "NOT_FOUND", message: "You must be logged in to update your details" })

      // TODO visit logic
      let user
      if (currentUser.id === input.id) {
        if (currentUser.role === "admin" || currentUser.role === "committee") {
          user = await ctx.db.update(users).set({ role: input.role }).where(eq(users.id, input.id))
        } else {
          // cant change some else's role
        }
      } else {
        if (input.role !== "member" || input.role !== null) {
          throw new TRPCError({ code: "FORBIDDEN", message: "You cannot change your own role" })
        } else {
          user = await ctx.db.update(users).set({ role: input.role }).where(eq(users.id, ctx.user?.id))
        }
      }
      // const user = await ctx.db.update(users).set({ role: input.role }).where(eq(users.id, ctx.user?.id))
      console.log(user)

      return user
    }),

  update: publicProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(2, {
            message: "Name is required",
          })
          .optional(),
        preferred_name: z
          .string()
          .min(2, {
            message: "Preferred name is required",
          })
          .optional(),
        email: z
          .string()
          .email({
            message: "Invalid email address",
          })
          .min(2, {
            message: "Email is required",
          })
          .optional(),
        pronouns: z
          .string()
          .min(2, {
            message: "Pronouns are required",
          })
          .optional(),
        student_number: z.string().optional(),
        uni: z.string().optional(),
        github: z.string().optional(),
        discord: z.string().optional(),
        subscribe: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.user

      if (!currentUser)
        throw new TRPCError({ code: "UNAUTHORIZED", message: "You must be logged in to update your details" })

      const [dbUser] = await ctx.db.select().from(users).where(eq(users.id, currentUser.id))

      const user = await ctx.db.update(users).set({
        name: input.name ?? dbUser?.name,
        preferred_name: input.preferred_name ?? dbUser?.preferred_name,
        email: input.email ?? dbUser?.email,
        pronouns: input.pronouns ?? dbUser?.pronouns,
        student_number: input.student_number ?? dbUser?.student_number,
        university: input.uni ?? dbUser?.university,
        github: input.github ?? dbUser?.github,
        discord: input.discord ?? dbUser?.discord,
        subscribe: input.subscribe ?? dbUser?.subscribe,
      })
      console.log(user)

      return user
    }),
})
