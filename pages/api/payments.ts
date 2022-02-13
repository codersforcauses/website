import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'

const paymentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { email, token, id }
  } = req

  if (req.method === 'POST') {
    try {
      const response = await (
        await fetch('https://connect.squareup.com/v2/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.ACCESS_TOKEN!,
            'Square-Version': '2022-01-20'
          },
          body: JSON.stringify({
            amount_money: {
              amount: 5.0,
              currency: 'AUD'
            },
            idempotency_key: crypto.randomUUID(),
            source_id: token || 'cnon:card-nonce-ok',
            buyer_email_address: email
          })
        })
      ).json()

      res.status(200).json({})
    } catch ({ message }) {
      res
        .status(400)
        .end(
          message ||
            'An unexpected error occurred. Please refresh the page and try again.'
        )
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end('Only POST requests allowed')
  }
}

export default paymentHandler
