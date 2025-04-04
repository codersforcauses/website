import { Client, Environment } from "square"

import { env } from "~/env"

export const squareClient = new Client({
  accessToken: env.SQUARE_ACCESS_TOKEN,
  environment: env.NEXT_PUBLIC_SQUARE_APP_ID.includes("sandbox") ? Environment.Sandbox : Environment.Production,
})
