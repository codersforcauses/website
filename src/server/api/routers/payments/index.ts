import { createTRPCRouter } from "~/server/api/trpc"

import { getCards } from "./get-cards"
import { pay } from "./pay"
import { storeCard } from "./store-card"

export const paymentsRouter = createTRPCRouter({
  pay,
  storeCard,
  getCards,
})
