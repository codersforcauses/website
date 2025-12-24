import { SquareClient, SquareEnvironment } from "square"

import { env } from "~/env"

export const squareClient = new SquareClient({
  token: env.SQUARE_ACCESS_TOKEN,
  environment: env.NEXT_PUBLIC_SQUARE_APP_ID.includes("sandbox")
    ? SquareEnvironment.Sandbox
    : SquareEnvironment.Production,
})
