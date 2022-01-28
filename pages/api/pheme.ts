import { NextApiRequest, NextApiResponse } from 'next'

const phemeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { user, pass }
  } = req

  if (req.method === 'POST') {
    const data = {
      username: user as string,
      password: pass as string
    }
    try {
      const response = await fetch('https://auth.uwamakers.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          user: data.username,
          pass: data.password,
          token: process.env.PHEME_TOKEN
        })
      }).then(resp => resp.json())

      if (!response.success) throw new Error(response.message)

      const { user } = response

      res.status(200).json({
        firstName: user.firstname.split(' ')[0],
        lastName: user.lastname,
        email: user.email
      })
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

export default phemeHandler
