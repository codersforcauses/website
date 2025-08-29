import { createTRPCRouter } from "~/server/api/trpc"

import { createManual } from "./create-manual"
import { getAll } from "./get-all"
import { getNamesByEmails } from "./get-name-by-email"
import { updateEmail } from "./update-email"
import { updateRole } from "./update-role"

export const usersAdminRouter = createTRPCRouter({
  createManual,
  getAll,
  updateRole,
  updateEmail,
  getNamesByEmails,
})
