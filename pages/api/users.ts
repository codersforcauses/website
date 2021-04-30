import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import User from '../../models/users.model'

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method
  } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const user = await User.findById(id)
        if (!user) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      // create data from your database
      res.status(200).json({})
      break
    case 'GET':
      // Get data from your database
      res.status(200).json({})
      break
    case 'PATCH':
      // update data from your database
      res.status(200).json({})
      break
    case 'DELETE':
      // delete data from your database
      res.status(200).json({})
      break
    case 'PUT':
      // Update or create data in your database
      res.status(200).json({})
      break
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PATCH', 'DELETE', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default userHandler
