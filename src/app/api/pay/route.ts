import { NextApiRequest, NextApiResponse } from "next"
import { Client, Environment, type Payment } from "square"
import { randomUUID } from "crypto"
import { env } from "~/env"

interface ReqBody {
  sourceId: string
  amount: string
  currency: string
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}

const { paymentsApi } = new Client({
  accessToken: env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // change this for prod
})

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return Response.json({ message: "Method Not Allowed" })
  }

  const body = (await req.json()) as ReqBody

  try {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: body.sourceId,
      amountMoney: {
        amount: BigInt(parseFloat(body.amount) * 100),
        currency: body.currency,
      },
    })

    console.log(result)

    return Response.json({ result })
  } catch (error) {
    console.error(error)

    return Response.json({ message: "Internal Server Error" })
  }
}
