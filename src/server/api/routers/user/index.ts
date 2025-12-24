import { createTRPCRouter } from "~/server/api/trpc"
import get from "./endpoints/get"
import checkIfExists from "./endpoints/check-If-exists"

export const userRouter = createTRPCRouter({
  checkIfExists,
  get,

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.insert(users).values({
  //       name: input.name,
  //       createdById: ctx.session.user.id,
  //     });
  //   }),
})
