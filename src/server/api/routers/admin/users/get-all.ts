import { desc } from "drizzle-orm"
import { adminProcedure } from "~/server/api/trpc"
import { User } from "~/server/db/schema"

export const getAll = adminProcedure.query(async ({ ctx }) => {
  const userList = await ctx.db.query.User.findMany({
    columns: {
      subscribe: false,
      square_customer_id: false,
      updatedAt: false,
    },
    orderBy: [desc(User.createdAt), desc(User.id)],
  })

  return userList
})
