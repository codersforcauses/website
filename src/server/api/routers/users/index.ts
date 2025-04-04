import { Client, Environment } from "square"

import { env } from "~/env"
import { createTRPCRouter } from "~/server/api/trpc"

import { create } from "./create"
import { createManual } from "./create-manual"
import { get } from "./get"
import { getCurrent } from "./get-current"
import { update } from "./update"
import { updateSocials } from "./update-socials"

export const { customersApi } = new Client({
  accessToken: env.SQUARE_ACCESS_TOKEN,
  environment: env.NEXT_PUBLIC_SQUARE_APP_ID.includes("sandbox") ? Environment.Sandbox : Environment.Production,
})

export const usersRouter = createTRPCRouter({
  create,
  createManual,
  getCurrent,
  get,
  update,
  updateSocials,
})
