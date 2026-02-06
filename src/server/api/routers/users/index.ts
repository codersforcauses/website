import { createTRPCRouter } from "~/server/api/trpc"

import { create } from "./create"
import { get } from "./get"
import { getCurrent } from "./get-current"
import { getNamesByEmails } from "./get-name-by-email"
import { update } from "./update"
import { updateEmail } from "./update-email"

export const usersRouter = createTRPCRouter({
  create,
  getCurrent,
  get,
  update,
  updateEmail,
  getNamesByEmails,
})
