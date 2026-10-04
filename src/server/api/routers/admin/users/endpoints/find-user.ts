import { eq, sql } from "drizzle-orm"
import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { candidates } from "~/server/db/schema"

/**
 * Find user by name or student number.
 * @param {string} Input - Input params
 * @returns {Promise<Array<Object>>} User - Array of users
 * @throws {TRPCError} - If user is not logged in or does not have admin privileges
 */
const findUser = adminProcedure
  .input(
    z.object({
      query: z.string().min(1, "Name or UWA student number is required"),
      restrictToUWA: z.boolean().optional().default(false),
      filter: z.xor([z.literal("candidate"), z.literal("project")]),
      filterId: z.uuidv7().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const query = `%${input.query}%`

    let userIDs: string[] = []
    if (input.filter === "candidate" && input.filterId) {
      const fetchExisting = await ctx.db
        .select({ users: sql<string[]>`ARRAY_AGG(${candidates.userId})` })
        .from(candidates)
        .where(eq(candidates.meetingId, input.filterId))

      userIDs = fetchExisting[0]?.users ?? []
    }

    const userList = await ctx.db.query.users.findMany({
      columns: {
        id: true,
        name: true,
        preferredName: true,
        studentNumber: true,
        role: true,
      },
      where: {
        OR: [{ name: { ilike: query } }, { preferredName: { ilike: query } }, { studentNumber: { ilike: query } }],
        // conditional to only show UWA students
        ...(input.restrictToUWA
          ? {
              studentNumber: {
                isNotNull: true,
              },
            }
          : undefined),
        // conditional to remove existing candidates
        ...(userIDs.length > 0
          ? {
              id: {
                notIn: userIDs,
              },
            }
          : null),
      },
      limit: 5,
    })

    return userList
  })

export default findUser
