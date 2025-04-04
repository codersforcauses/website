import { Ratelimit } from "@upstash/ratelimit"
import { protectedRatedProcedure } from "~/server/api/trpc"
import { squareClient } from "~/server/services/square"

export const getCards = protectedRatedProcedure(Ratelimit.fixedWindow(60, "30s")).query(async ({ ctx }) => {
  const currentUser = ctx.user
  const { result } = await squareClient.cardsApi.listCards(undefined, currentUser?.square_customer_id)

  return result.cards?.map((card) => ({
    id: card.id ?? "",
    number: `**** **** **** ${card.last4}`,
    brand: card.cardBrand,
    expiry: `${Number(card.expMonth)}/${Number(card.expYear)}`,
  }))
})
