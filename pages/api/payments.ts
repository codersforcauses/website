import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@helpers/global'

const paymentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { email, token, id }
  } = req

  const paymentURL =
    process.env.NODE_ENV === 'production'
      ? 'https://connect.squareup.com/v2/payments'
      : 'https://connect.squareupsandbox.com/v2/payments'

  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

  if (req.method === 'POST') {
    try {
      const userPromise = fetch(`${url}/api/users?id=${id}`)
      const paymentPromise = fetch(paymentURL, {
        method: 'POST',
        headers: {
          'Square-Version': '2022-01-20',
          Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          mode: 'cors'
        },
        body: JSON.stringify({
          amount_money: {
            amount: 500,
            currency: 'AUD'
          },
          idempotency_key: crypto.randomUUID(),
          source_id: token,
          buyer_email_address: email
        })
      })

      const [userResponse, paymentResponse] = await Promise.all([
        userPromise,
        paymentPromise
      ])
      const user: User = await userResponse.json()
      const { card } = (await paymentResponse.json()).payment.card_details

      await fetch(`${url}/api/users?id=${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          cards: [
            ...user?.cards!,
            {
              token,
              details: {
                brand: card.card_brand,
                last4: card.last_4,
                expMonth: card.exp_month,
                expYear: card.exp_year
              }
            }
          ]
        })
      })

      res.status(200).end(`Created card for ${user?.name}`)
    } catch (err: any) {
      console.log(err)

      res
        .status(400)
        .end(
          err.message ||
            'An unexpected error occurred. Please refresh the page and try again.'
        )
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end('Only POST requests allowed')
  }
}

export default paymentHandler
