import { clerkClient } from "@clerk/nextjs/server"
import { TRPCError } from "@trpc/server"
import { Ratelimit } from "@upstash/ratelimit"
import { randomUUID } from "crypto"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"
import { squareClient } from "~/server/services/square"

export const create = publicRatedProcedure(Ratelimit.fixedWindow(4, "30s"))
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
    // TODO: wrap in a transaction
    const { result, statusCode } = await squareClient.customersApi.createCustomer({
      idempotencyKey: randomUUID(),
      givenName: input.preferred_name,
      familyName: input.name,
      emailAddress: input.email,
      // TODO: convert to user ID (UUIDv7)
      referenceId: input.clerk_id,
    })

    if (!result.customer?.id) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to create square customer ${statusCode}`,
        cause: JSON.stringify(result),
      })
    }

    const clerk = await clerkClient()
    const clerkUser = await clerk.users.getUser(input.clerk_id)

    if (!clerkUser) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Clerk user with id: ${input.clerk_id} does not exist`,
      })
    }

    const [user] = await ctx.db
      .insert(User)
      .values({
        clerk_id: input.clerk_id,
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
  })
