import { Client, Environment } from "square"

import { env } from "~/env"
import { createTRPCRouter } from "~/server/api/trpc"

import { create } from "./create"
import { get, getByEmail } from "./get"
import { getCurrent } from "./get-current"
import { update } from "./update"
import { updateSocials } from "./update-socials"

export const usersRouter = createTRPCRouter({
  create,
  getCurrent,
  get,
  update,
  updateSocials,
  getByEmail,
})
