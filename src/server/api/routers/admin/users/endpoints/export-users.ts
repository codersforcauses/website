import { z } from "zod"

import { adminProcedure } from "~/server/api/trpc"

/**
 * Export all users.
 * @param {Object} Input -
 * @returns {Promise<Array<Object>>} User - Array of users
 * @throws {TRPCError} - If user is not logged in or does not have admin privileges
 */
const exportUsers = adminProcedure.input(z.record(z.string(), z.boolean())).mutation(async ({ ctx, input }) => {
  // TODO: add query filters
  const data = await ctx.db.query.users.findMany({
    columns: {
      ...input,
      image: false,
    },
    limit: 20, // TODO: remove once it works
    orderBy: {
      createdAt: "desc",
    },
  })
  if (data?.length > 0) {
    const headers = Object.keys(data[0] as Record<string, unknown>).join(",")
    const rows = data.map((row) => Object.values(row).join(",")).join("\n")
    const csv = headers + "\n" + rows
    const blob = new Blob([csv], { type: "text/csv" })
    return blob
  }

  return null
})

export default exportUsers
