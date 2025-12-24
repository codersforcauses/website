import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { users } from "~/server/db/schema"

const LIMIT = 25

/**
 * Get all users.
 * @param {Object} Input - Input params
 * @param {string} Input.query - Input params
 * @param {string} Input.cursor - Used by react-query for infinite scrolling. DO NOT MODIFY
 * @param {string} Input.filters - Input params
 * @returns {Promise<Array<Object>>} User - Array of users
 * @throws {TRPCError} - If user is not logged in or does not have admin privileges
 */
const getUsers = adminProcedure
  .input(
    z.object({
      query: z.string(),
      cursor: z.number().min(0).default(0),
      filters: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const query = `%${input.query}%`
    // const filters = input.filters

    const [total, userList] = await Promise.all([
      ctx.db.$count(users),
      ctx.db.query.users.findMany({
        columns: {
          emailVerified: false,
          subscribe: false,
          squareCustomerId: false, // ? Maybe keep
          updatedAt: false,
        },
        limit: LIMIT,
        offset: LIMIT * input.cursor,
        where: {
          OR: [
            {
              name: { ilike: query },
            },
            {
              preferredName: { ilike: query },
            },
            {
              email: { ilike: query },
            },
            {
              studentNumber: { ilike: query },
            },
          ],
        },
        orderBy: {
          // ! change to new format
          //   ...filters
          //     .split(",")
          //     .map((f) => {
          //       const [field, order] = f.split("=")
          //       if (field === "name") return order === "desc" ? desc(users.preferredName) : asc(users.preferredName)
          //       return
          //     })
          //     .filter(Boolean),
          createdAt: "desc",
        },
      }),
    ])

    return {
      users: userList,
      total,
      nextPage: input.cursor + 1 < total ? input.cursor + 1 : undefined,
    }
  })

export default getUsers
