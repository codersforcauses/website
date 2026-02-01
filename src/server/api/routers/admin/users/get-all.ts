import { desc } from "drizzle-orm"

import { adminProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const getAll = adminProcedure.query(async ({ ctx }) => {
  const userList = await ctx.db.query.User.findMany({
    orderBy: [desc(User.createdAt), desc(User.id)],
  })

  return userList
})
