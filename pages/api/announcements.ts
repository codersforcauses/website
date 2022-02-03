import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@lib/dbConnect'
import announcements from '@models/announcements'
import { Announcements } from '@helpers/global'

const eventRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        await announcements.create({ ...body })
        res.status(201).end('Created announcement')
      } catch (error) {
        console.log(error)

        res.status(400).json({
          success: false,
          message: 'Failed to create announcement'
        })
      }
      break
    case 'GET':
      try {
        const ann: Announcements = await announcements
          .find()
          .sort('-createdAt')
          .limit(6)
          .lean()
        res.status(200).json(ann)
      } catch (error) {
        console.log(error)

        res.status(400).json({
          success: false,
          message: 'Failed to create announcement'
        })
      }
      break
    default:
      res.setHeader('Allow', ['POST', 'GET'])
      res.status(405).end('Only POST and GET requests allowed')
      break
  }
}

export default eventRoute
