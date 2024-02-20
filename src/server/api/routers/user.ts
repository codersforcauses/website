import { TRPCError } from "@trpc/server"
import { clerkClient } from "@clerk/nextjs"
import { Client, Environment } from "square"
import { randomUUID } from "crypto"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc"
import { NAMED_ROLES } from "~/lib/constants"
import { users } from "~/server/db/schema"
import { env } from "~/env"

const { customersApi, paymentsApi } = new Client({
  accessToken: env.SQUARE_ACCESS_TOKEN,
  environment: env.NEXT_PUBLIC_SQUARE_APP_ID.includes("sandbox") ? Environment.Sandbox : Environment.Production,
})

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
      try {
        const { result } = await customersApi.createCustomer({
          idempotencyKey: randomUUID(),
          givenName: input.preferred_name,
          familyName: input.name,
          emailAddress: input.email,
          referenceId: input.clerk_id,
        })

        if (!result.customer?.id) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create square customer" })
        }

        await ctx.db.insert(users).values({
          id: input.clerk_id,
          name: input.name.trim(),
          preferred_name: input.preferred_name.trim(),
          email: input.email.trim(),
          pronouns: input.pronouns.trim(),
          student_number: input.student_number,
          university: input.uni,
          github: input.github,
          discord: input.discord,
          subscribe: input.subscribe ?? true,
          square_customer_id: result.customer?.id,
        })
        const [user] = await ctx.db.select().from(users).where(eq(users.id, input.clerk_id))
        return user
      } catch (error) {
        // add error handling
        await clerkClient.users.deleteUser(input.clerk_id)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Failed to create user ${input.name}.` })
      }
    }),

  login: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const id = ctx.user?.id
      const [user] = await ctx.db.select().from(users).where(eq(users.id, id))
      return user
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Unable to retrieve user with id: ${ctx.user.id}` })
    }
  }),

  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const [user] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id))
    return user
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const [user] = await ctx.db.select().from(users).where(eq(users.id, input))
    return user
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      columns: {
        role: true,
      },
      where: eq(users.id, ctx.user.id),
    })
    if (!user) throw new TRPCError({ code: "NOT_FOUND", message: `Could not find user with id:${ctx.user.id}` })
    if (user.role !== "admin" && user.role !== "committee")
      throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to view all users." })
    const userList = await ctx.db.query.users.findMany({
      columns: {
        subscribe: false,
        square_customer_id: false,
      },
    })

    return userList
  }),

  updateRole: protectedProcedure
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
      try {
        const [currentUser] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id))
        if (!currentUser)
          throw new TRPCError({ code: "NOT_FOUND", message: `Could not find user with id:${ctx.user.id}` })

        // allow admin and committee to update to any role
        if (currentUser.role === "admin" || currentUser.role === "committee") {
          await ctx.db.update(users).set({ role: input.role }).where(eq(users.id, input.id))
        } else {
          if (currentUser.id === input.id) {
            // allow user to remove their role
            if (input.role === null) {
              await ctx.db.update(users).set({ role: input.role }).where(eq(users.id, ctx.user?.id))
            } else if (input.role === "member") {
              if (!input.paymentID) throw new TRPCError({ code: "BAD_REQUEST", message: "Payment ID is required" })

              try {
                // check payment
                const { result } = await paymentsApi.getPayment(input.paymentID)
                if (
                  result.payment?.status === "COMPLETED" &&
                  result.payment?.referenceId === ctx.user.id &&
                  result.payment.note?.includes("CFC Membership")
                ) {
                  // only update role if payment successful and user is not already a member
                  if (currentUser.role === null) {
                    await ctx.db.update(users).set({ role: input.role }).where(eq(users.id, ctx.user?.id))
                  }
                } else {
                  throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Payment is not valid or was unable to be verified.",
                  })
                }
              } catch (error) {
                throw new TRPCError({
                  code: "INTERNAL_SERVER_ERROR",
                  message: "Failed to verify membership payment.",
                })
              }
            } else {
              throw new TRPCError({ code: "FORBIDDEN", message: "You cannot give yourself higher access." })
            }
          } else {
            throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to update this user." })
          }
        }

        const [user] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id))
        return user
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update user role" })
      }
    }),

  update: protectedProcedure
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
        student_number: z.string().nullish(),
        uni: z.string().optional().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const currentUser = ctx.user
        // TODO: update clerk email
        await Promise.all([
          clerkClient.users.updateUser(ctx.user.id, {
            // emailAddress: input.email,
            firstName: input.preferred_name,
            lastName: input.name,
          }),
          ctx.db
            .update(users)
            .set({
              name: input.name?.trim(),
              preferred_name: input.preferred_name?.trim(),
              email: input.email?.trim(),
              pronouns: input.pronouns?.trim(),
              student_number: input.student_number?.trim(),
              university: input.uni?.trim(),
            })
            .where(eq(users.id, currentUser.id)),
        ])

        const [user] = await ctx.db.select().from(users).where(eq(users.id, currentUser.id))
        return user
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update user" })
      }
    }),

  updateSocial: protectedProcedure
    .input(
      z.object({
        github: z.string().optional().nullish(),
        discord: z.string().optional().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const currentUser = ctx.user

        await ctx.db
          .update(users)
          .set({
            github: input.github?.trim(),
            discord: input.discord?.trim(),
          })
          .where(eq(users.id, currentUser.id))

        const [user] = await ctx.db.select().from(users).where(eq(users.id, currentUser.id))
        return user
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update user's socials" })
      }
    }),
})
