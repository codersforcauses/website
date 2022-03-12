import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import dbConnect from '@lib/dbConnect'
import announcements from '@models/announcements'
import { Announcements } from '@lib/types'

const announcementRoute = async (req: NextApiRequest, res: NextApiResponse) => {
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
        const announce: Announcements[] = await announcements
          .find()
          .sort('-createdAt')
          .limit(6)
          .lean()

        const annList = announce.map(ann => ({
          color: ann?.color,
          html: ann?.html,
          date: dayjs(ann?.createdAt).format('DD/MM/YY')
        }))
        res.status(200).json(annList)
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

export default announcementRoute
