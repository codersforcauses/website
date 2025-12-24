import { createTRPCRouter } from "~/server/api/trpc"
import storeCard from "./endpoints/store-card"
import listCards from "./endpoints/list-cards"
import payMembership from "./endpoints/pay-membership"
// import pay from "./endpoints/pay"

export const paymentRouter = createTRPCRouter({
  listCards,
  storeCard,
  payMembership,
  // pay
})
