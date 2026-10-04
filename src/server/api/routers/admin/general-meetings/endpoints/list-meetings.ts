import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"
import { generalMeetings } from "~/server/db/schema"

/**
 * Get list of meetings with latest first
 * @param {boolean} - Whether to show all results or just top 5 (defaults to false which is just top 5)
 * @returns {Promise<Object>} - Object returning general meeting id, slug, title, and status
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const listMeetings = adminProcedure.input(z.boolean().default(false)).query(async ({ ctx, input }) => {
  const [total, meetings] = await Promise.all([
    ctx.db.$count(generalMeetings),
    ctx.db.query.generalMeetings.findMany({
      columns: {
        id: true,
        slug: true,
        title: true,
        status: true,
      },
      limit: input ? undefined : 5,
      orderBy: {
        start: "desc",
      },
    }),
  ])

  return {
    total,
    data: meetings,
  }
})

export default listMeetings
