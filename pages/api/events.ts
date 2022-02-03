import { NextApiRequest, NextApiResponse } from 'next'

const eventRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'POST':
      return
    case 'PATCH':
      return
    case 'DELETE':
      return
    default:
      return
  }
}

export default eventRoute
