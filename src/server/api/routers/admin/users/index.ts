import { createTRPCRouter } from "~/server/api/trpc"

import { getAll } from "./get-all"
import { updateEmail } from "./update-email"
import { updateRole } from "./update-role"

export const usersAdminRouter = createTRPCRouter({
  getAll,
  updateRole,
  updateEmail,
})
