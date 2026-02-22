import { adminProcedure } from "~/server/api/trpc"

/**
 * Returns all general meetings ordered by start date descending
 * @returns {Promise<Object[]>} - Array of all general meetings
 * @throws {TRPCError} - If user is not logged in or does not have admin privileges
 */
const getAllMeetings = adminProcedure.query(async ({ ctx }) => {
  return ctx.db.query.generalMeetings.findMany({
    columns: {
      id: true,
      slug: true,
      title: true,
      start: true,
      status: true,
    },
    orderBy: { start: "desc" },
  })
})

export default getAllMeetings
