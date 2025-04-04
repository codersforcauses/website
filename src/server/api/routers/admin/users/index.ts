import { createTRPCRouter } from "~/server/api/trpc"
import { getAll } from "./get-all"
import { updateRole } from "./update-role"
import { updateEmail } from "./update-email"

export const usersAdminRouter = createTRPCRouter({
  getAll,
  updateRole,
  updateEmail,
})
