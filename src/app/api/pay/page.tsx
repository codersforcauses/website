import { Client, Environment } from "square"
import { randomUUID } from "crypto"
import { env } from "~/env"
import { type NextApiResponse } from "next"

interface Req {
  method: string
  body: {
    sourceId: string
    amount: string
    currency: string
  }
}
const { paymentsApi } = new Client({
  accessToken: env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
})

export default async function handler(req: Req, res: NextApiResponse) {
  if (req.method === "POST") {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        amount: BigInt(req.body.amount),
        currency: req.body.currency,
      },
    })
    console.log(result)
    res.status(200).json(result)
  } else {
    res.status(500).send({ error: "Method Not Allowed" })
  }
}
