import { NextApiRequest, NextApiResponse } from 'next'
import dayjs from 'dayjs'
import User from '@models/user'
import dbConnect from '@lib/dbConnect'
import { User as UserType } from '@lib/types'

const convertDate = (date: string) => dayjs(date).format('MMM D, YYYY h:mm A')

const userIDRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id }
  } = req

  await dbConnect()

  switch (method) {
    case 'PATCH':
      try {
        const user = await User.findByIdAndUpdate(id, JSON.parse(body))
        res
          .status(200)
          .end(`Updated user ${user?.firstName} ${user?.lastName}`.trim())
      } catch (error) {
        console.log(error)

        res.status(200).json({
          success: false,
          message: 'Failed to update user'
        })
      }
      break
    case 'GET':
      try {
        const user: UserType = await User.findById(id).lean()
        res.status(200).json({
          ...user,
          name: `${user?.firstName} ${user?.lastName}`.trim(),
          roles: user?.isFinancialMember
            ? user.roles?.concat(['member'])
            : user?.roles,
          createdAt: convertDate(user?.createdAt!),
          updatedAt: convertDate(user?.updatedAt!)
        })
      } catch (error) {
        res.status(404).json({
          success: false,
          message: 'User Not Found'
        })
      }
      break
    default:
      res.setHeader('Allow', ['PATCH', 'GET'])
      res.status(405).end('Only PATCH and GET requests allowed using user id')
      break
  }
}

export default userIDRoute
