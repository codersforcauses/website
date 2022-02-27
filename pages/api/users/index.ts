import { NextApiRequest, NextApiResponse } from 'next'
import { users } from '@clerk/nextjs/api'
import dayjs from 'dayjs'
import User from '@models/user'
import dbConnect from '@lib/dbConnect'
import { User as UserType } from '@helpers/types'

const convertDate = (date: string) => dayjs(date).format('MMM D, YYYY h:mm A')

const modifyUser = (user: Partial<UserType>) => ({
  ...user,
  name: `${user?.firstName} ${user?.lastName}`.trim(),
  roles: user?.isFinancialMember ? user.roles?.concat(['member']) : user?.roles,
  createdAt: convertDate(user?.createdAt!),
  updatedAt: convertDate(user?.updatedAt!)
})

const userRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      let clerk_id = ''
      try {
        const [{ id: clerk_id }] = await users.getUserList({
          emailAddress: [body.email]
        })
        await User.create({
          ...body,
          clerkID: clerk_id!
        })
        res.status(201).end('Created user')
      } catch (error: any) {
        await users.deleteUser(clerk_id)
        if ('email' in error.keyValue)
          res.status(409).json({
            success: false,
            message: 'Failed to create user as email already exists'
          })
        console.log({ error })
        res.status(400).json({
          success: false,
          message: 'Failed to create user'
        })
      }
      break
    case 'DELETE':
      try {
        const clerkID = query.clerkID as string
        await Promise.all([
          User.deleteOne({ clerkID: clerkID }),
          users.deleteUser(clerkID)
        ])
        res.status(200).end('Deleted user')
      } catch (error) {
        console.log(error)

        res.status(424).json({
          success: false,
          message: 'Failed to delete user'
        })
      }
      break
    case 'GET':
      if (!query.all) {
        try {
          const user: UserType = await User.findOne({
            ...query
          }).lean()
          res.status(200).json(modifyUser(user))
        } catch (error) {
          res.status(404).json({
            success: false,
            message: 'User Not Found'
          })
        }
        break
      }

      try {
        const { findUser } = query
        const getUsers: Array<UserType> = await User.find(
          findUser
            ? {
                $or: [
                  { firstName: { $regex: findUser, $options: 'i' } },
                  { lastName: { $regex: findUser, $options: 'i' } },
                  { email: { $regex: findUser, $options: 'i' } }
                ]
              }
            : {},
          '-dob -bio -socials -tech -cards',
          findUser ? { limit: 10 } : {}
        )
          .sort('-createdAt')
          .lean()
        const users = getUsers.map(user => modifyUser(user))
        res.status(200).json(users)
      } catch (error) {
        res.status(403).json({
          success: false,
          message: 'You are not allowed to access user data'
        })
      }
      break
    default:
      res.setHeader('Allow', ['POST', 'DELETE', 'GET'])
      res.status(405).end('Only POST, DELETE, and GET requests allowed')
      break
  }
}

export default userRoute
