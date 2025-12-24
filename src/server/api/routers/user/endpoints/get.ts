import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { publicRatedProcedure } from "~/server/api/trpc"
import { UNIVERSITIES } from "~/lib/constants"

/**
 * Get user by id
 * @param {string} input - User ID
 * @returns {Promise<Object>} - User object with limited information
 * @throws {TRPCError} - If user does not exist or if the user is not found
 */
const get = publicRatedProcedure()
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const currentUser = ctx.session?.user
    const roles = currentUser?.role?.split(",").map((role) => role.toLowerCase().trim())
    const user = await ctx.db.query.users.findFirst({
      where: {
        id: input,
      },
    })

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: `User id: ${input} does not exist` })
    }

    const baseUser = {
      name: user.name,
      preferredName: user.preferredName,
      pronouns: user.pronouns,
      image: user.image,
      github: user.github,
      discord: user.discord,
      role: user.role,
      university: user?.studentNumber
        ? "University of Western Australia"
        : (UNIVERSITIES.find(({ value }) => value === user.university)?.label ?? user.university),
      studentNumber: null,
    }

    if (roles?.includes("admin") || roles?.includes("committee"))
      return {
        ...baseUser,
        studentNumber: user.studentNumber,
      }

    return {
      ...baseUser,
    }
  })

export default get
