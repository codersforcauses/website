import { TRPCError } from "@trpc/server"
import * as z from "zod"

import { adminProcedure } from "~/server/api/trpc"

/**
 * Get meeting agenda with slug
 * @param {string} - unique slug for meeting
 * @returns {Promise<Object>} - Object returning general meeting
 * @throws {TRPCError} - If user is not logged in, does not have admin privileges, or the db operation fails
 */
const listVotersForMeeting = adminProcedure
  .input(
    z.object({
      approved: z.boolean().optional().default(false),
      meetingId: z.uuidv7().min(1, "General meeting ID is required"),
    }),
  )
  .query(async ({ ctx, input }) => {
    // TODO: change to select with joins and group by
    const voters = await ctx.db.query.voters.findMany({
      columns: {
        id: true,
      },
      where: {
        id: input.meetingId,
        approved: input.approved,
      },
      with: {
        user: {
          columns: {
            image: true,
            name: true,
            preferredName: true,
            studentNumber: true,
            email: true,
            role: true,
          },
        },
      },
    })
    if (!voters)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not retrieve voters from slug",
      })
    return voters
  })

export default listVotersForMeeting
