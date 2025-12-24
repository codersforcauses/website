import { Ratelimit } from "@upstash/ratelimit"

import { protectedRatedProcedure } from "~/server/api/trpc"
import { squareClient } from "~/lib/square.server"

/**
 * Gets user's saved cards from Square
 * @returns {Promise<Object>} - Minimal data about user's saved cards
 */
const listCards = protectedRatedProcedure(Ratelimit.slidingWindow(10, "30s")).query(async ({ ctx }) => {
  const { data } = await squareClient.cards.list({
    customerId: ctx.session.user.squareCustomerId,
  })

  if (!data) return []

  return data.map((card) => ({
    id: card.id,
    number: `**** **** **** ${card.last4}`,
    brand: card.cardBrand,
    expiry: `${Number(card.expMonth)}/${Number(card.expYear)}`,
  }))
})

export default listCards
