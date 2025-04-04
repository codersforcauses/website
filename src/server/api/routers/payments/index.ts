import { pay } from "./pay"
import { storeCard } from "./store-card"
import { createTRPCRouter } from "~/server/api/trpc"
import { getCards } from "./get-cards"

export const paymentsRouter = createTRPCRouter({
  pay,
  storeCard,
  getCards,
})
