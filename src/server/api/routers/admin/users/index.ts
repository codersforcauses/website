import { createTRPCRouter } from "~/server/api/trpc"

import getUsers from "./endpoints/get-users"
import exportUsers from "./endpoints/export-users"

export const usersAdminRouter = createTRPCRouter({
  getUsers,
  exportUsers,
})
