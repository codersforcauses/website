import { eq } from "drizzle-orm"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { users } from "~/server/db/schema"

/**
 * Checks if user exists by email
 * @param {string} input - User email
 * @returns {Promise<boolean>} - Boolean if user exists
 */
const checkIfExists = publicRatedProcedure()
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    try {
      const userCheck = await ctx.db.$count(users, eq(users.email, input.toLowerCase()))
      console.log("Check if user: ", userCheck)

      return Boolean(userCheck)
    } catch (error) {
      console.log(error)
    }
  })

export default checkIfExists
