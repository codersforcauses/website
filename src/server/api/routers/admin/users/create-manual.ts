import { type User as ClerkUser, clerkClient } from "@clerk/nextjs/server"
import { TRPCError } from "@trpc/server"
import { randomUUID } from "crypto"
import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

import { customersApi } from "../../users"

export const createManual = adminProcedure
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
    // TODO: wrap in a transaction
    try {
      clerkRes = await clerkClient().users.createUser({
        emailAddress: [input.email],
        firstName: input.preferred_name,
        lastName: input.name, // we treat clerk.lastName as the user's full name
      })
    } catch (err) {
      // user might exist already
      clerkRes = (await clerkClient().users.getUserList({ emailAddress: [input.email] })).data[0]
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
      // TODO: convert to user ID (UUIDv7)
      referenceId: clerkRes.id,
    })

    if (!result.customer?.id) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to create square customer ${statusCode}`,
        cause: JSON.stringify(result),
      })
    }

    await ctx.db.insert(User).values({
      clerk_id: clerkRes.id,
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
  })
