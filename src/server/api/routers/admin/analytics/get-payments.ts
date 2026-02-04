import { desc } from "drizzle-orm"

import { adminProcedure } from "~/server/api/trpc"
import { Payment } from "~/server/db/schema"

export const getAllPayments = adminProcedure.query(async ({ ctx }) => {
  const paymentList = await ctx.db.query.Payment.findMany({
    orderBy: [desc(Payment.created_at), desc(Payment.id)],
  })

  return paymentList
})
