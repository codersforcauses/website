import { clerkClient, type User as ClerkUser } from "@clerk/nextjs/server"
import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { randomUUID } from "crypto"
import { desc, eq } from "drizzle-orm"
import { Client, Environment } from "square"
import { z } from "zod"
import { updateEmail } from "~/app/actions"

import { env } from "~/env"
import { NAMED_ROLES } from "~/lib/constants"
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  protectedRatedProcedure,
  publicRatedProcedure,
} from "~/server/api/trpc"
import { users } from "~/server/db/schema"

const { customersApi, paymentsApi } = new Client({
  accessToken: env.SQUARE_ACCESS_TOKEN,
  environment: env.NEXT_PUBLIC_SQUARE_APP_ID.includes("sandbox") ? Environment.Sandbox : Environment.Production,
})

export const userRouter = createTRPCRouter({
  create: publicRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
    .input(
      z.object({
        clerk_id: z
          .string()
          .min(2, {
            message: "Clerk ID is required",
          })
          .trim(),
        name: z
          .string()
          .min(2, {
            message: "Name is required",
          })
          .trim(),
        preferred_name: z
          .string()
          .min(2, {
            message: "Preferred name is required",
          })
          .trim(),
        email: z
          .string()
          .email({
            message: "Invalid email address",
          })
          .min(2, {
            message: "Email is required",
          })
          .trim(),
        pronouns: z
          .string()
          .min(2, {
            message: "Pronouns are required",
          })
          .trim(),
        student_number: z.string().trim().optional(),
        uni: z.string().trim().optional(),
        github: z.string().trim().optional(),
        discord: z.string().trim().optional(),
        subscribe: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { result, statusCode } = await customersApi.createCustomer({
        idempotencyKey: randomUUID(),
        givenName: input.preferred_name,
        familyName: input.name,
        emailAddress: input.email,
        referenceId: input.clerk_id,
      })

      if (!result.customer?.id) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to create square customer ${statusCode}`,
          cause: JSON.stringify(result),
        })
      }

      const clerkUser = await clerkClient.users.getUser(input.clerk_id)

      if (!clerkUser) {
        // ! fucked, don't manually create a user because that can be abused
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Clerk user with id:${input.clerk_id} does not exist`,
        })
        // clerkUser = await clerkClient.users.createUser({
        //   emailAddress: [input.email],
        //   firstName: input.preferred_name,
        //   lastName: input.name, // we treat clerk.lastName as the user's full name
        // })
      }

      const [user] = await ctx.db
        .insert(users)
        .values({
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
          square_customer_id: result.customer.id,
        })
        .returning()

      return user
    }),

  createManual: adminProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(2, {
            message: "Name is required",
          })
          .trim(),
        preferred_name: z
          .string()
          .min(2, {
            message: "Preferred name is required",
          })
          .trim(),
        email: z
          .string()
          .email({
            message: "Invalid email address",
          })
          .min(2, {
            message: "Email is required",
          })
          .trim(),
        pronouns: z
          .string()
          .min(2, {
            message: "Pronouns are required",
          })
          .trim(),
        student_number: z.string().trim().optional(),
        uni: z.string().trim().optional(),
        github: z.string().trim().optional(),
        discord: z.string().trim().optional(),
        subscribe: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let clerkRes: ClerkUser | undefined
      try {
        clerkRes = await clerkClient.users.createUser({
          emailAddress: [input.email],
          firstName: input.preferred_name,
          lastName: input.name, // we treat clerk.lastName as the user's full name
        })
      } catch (err) {
        // user might exist already
        clerkRes = (await clerkClient.users.getUserList({ emailAddress: [input.email] })).data[0]
      }

      if (!clerkRes)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create or repair user. What the hell?",
        })

      const { result, statusCode } = await customersApi.createCustomer({
        idempotencyKey: randomUUID(),
        givenName: input.preferred_name,
        familyName: input.name,
        emailAddress: input.email,
        referenceId: clerkRes.id,
      })

      if (!result.customer?.id) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to create square customer ${statusCode}`,
          cause: JSON.stringify(result),
        })
      }

      await ctx.db.insert(users).values({
        id: clerkRes.id,
        name: input.name,
        preferred_name: input.preferred_name,
        email: input.email,
        pronouns: input.pronouns,
        student_number: input.student_number,
        university: input.uni,
        github: input.github,
        discord: input.discord,
        subscribe: input.subscribe ?? true,
        square_customer_id: result.customer.id,
      })
    }),

  getCurrent: protectedRatedProcedure(Ratelimit.fixedWindow(40, "30s")).query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.user.id),
      columns: {
        square_customer_id: false,
      },
    })

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Could not find currentuser with id:${ctx.user.id}`,
      })
    }
    return user
  }),

  get: publicRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input),
      })
      return user
    }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    const userList = await ctx.db.query.users.findMany({
      columns: {
        subscribe: false,
        square_customer_id: false,
        updatedAt: false,
      },
      orderBy: [desc(users.createdAt), desc(users.id)],
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
      const [currentUser] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id))
      if (!currentUser)
        throw new TRPCError({ code: "NOT_FOUND", message: `Could not find user with id:${ctx.user.id}` })

      // allow admin and committee to update to any role
      if (currentUser.role === "admin" || currentUser.role === "committee") {
        const [user] = await ctx.db.update(users).set({ role: input.role }).where(eq(users.id, input.id)).returning()
        return user
      } else {
        if (currentUser.id === input.id) {
          // allow user to remove their role
          if (input.role === null) {
            const [user] = await ctx.db
              .update(users)
              .set({ role: input.role })
              .where(eq(users.id, ctx.user.id))
              .returning()
            return user
          } else if (input.role === "member") {
            if (!input.paymentID) throw new TRPCError({ code: "BAD_REQUEST", message: "Payment ID is required" })

            // check payment
            const { result } = await paymentsApi.getPayment(input.paymentID)
            if (
              result.payment?.status === "COMPLETED" &&
              result.payment?.referenceId === ctx.user.id &&
              result.payment.note === `CFC Membership ${new Date().getFullYear()}`
            ) {
              // only update role if payment successful and user is not already a member
              if (currentUser.role === null) {
                const [user] = await ctx.db
                  .update(users)
                  .set({ role: input.role })
                  .where(eq(users.id, ctx.user.id))
                  .returning()
                return user
              }
            } else {
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Payment is not valid or was unable to be verified.",
              })
            }
          } else {
            throw new TRPCError({ code: "FORBIDDEN", message: "You cannot give yourself higher access." })
          }
        } else {
          throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission to update this user." })
        }
      }
    }),

  update: protectedRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
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
      const currentUser = ctx.user
      // TODO: update clerk email
      await clerkClient.users.updateUser(ctx.user.id, {
        // emailAddress: input.email,
        firstName: input.preferred_name,
        lastName: input.name,
      })

      const [user] = await ctx.db
        .update(users)
        .set({
          name: input.name?.trim(),
          preferred_name: input.preferred_name?.trim(),
          email: input.email?.trim(),
          pronouns: input.pronouns?.trim(),
          student_number: input.student_number?.trim() ?? null,
          university: input.uni?.trim() ?? null,
        })
        .where(eq(users.id, currentUser.id))
        .returning()

      return user
    }),

  updateSocial: protectedRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
    .input(
      z.object({
        github: z.string().optional().nullish(),
        discord: z.string().optional().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.user

      const [user] = await ctx.db
        .update(users)
        .set({
          github: input.github?.trim(),
          discord: input.discord?.trim(),
        })
        .where(eq(users.id, currentUser.id))
        .returning()

      return user
    }),

  updateEmail: adminProcedure
    .input(z.object({ userId: z.string(), oldEmail: z.string().email(), newEmail: z.string().email() }))
    .mutation(async ({ input }) => {
      const clerkUser = await clerkClient.users.getUser(input.userId)
      if (!clerkUser)
        throw new TRPCError({ code: "NOT_FOUND", message: `Clerk user with id:${input.userId} does not exist` })
      if (!clerkUser.primaryEmailAddressId)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Clerk user with id:${input.userId} does not have a primary email address???`,
        })

      // sorry
      if (clerkUser.primaryEmailAddress?.emailAddress !== input.oldEmail)
        throw new TRPCError({ code: "BAD_REQUEST", message: "Old email does not match" })
      try {
        await updateEmail(clerkUser.id, clerkUser.primaryEmailAddressId, input.newEmail)
      } catch (err) {
        console.error(err)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update email" })
      }

      return clerkUser
    }),
})
