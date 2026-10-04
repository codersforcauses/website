import { createTRPCRouter } from "~/server/api/trpc"

import listUsers from "./endpoints/list-users"
import exportUsers from "./endpoints/export-users"
import findUser from "./endpoints/find-user"

export const usersAdminRouter = createTRPCRouter({
  findUser,
  listUsers,
  exportUsers,
})
