import { NextApiRequest, NextApiResponse } from 'next'
import { users } from '@clerk/nextjs/api'
import dayjs from 'dayjs'
import User from '@models/user'
import dbConnect from '@lib/dbConnect'
import { User as UserType } from '@helpers/global'

const convertDate = (date: string) => dayjs(date).format('MMM D, YYYY h:mm A')

const modifyUser = (user: UserType) => ({
  ...user,
  name: `${user?.firstName} ${user?.lastName}`.trim(),
  roles: user?.isFinancialMember ? ['member'] : user?.roles,
  createdAt: convertDate(user?.createdAt as string),
  updatedAt: convertDate(user?.updatedAt as string)
})

const userRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      let clerk_id = ''
      try {
        const [{ id: userID }] = await users.getUserList({
          emailAddress: [body.email]
        })
        clerk_id = userID as string

        const user = await User.create({
          ...body,
          clerkID: clerk_id
        })
        res.status(201).json({
          ...user,
          name: `${user.firstName} ${user.lastName}`.trim(),
          createdAt: convertDate(user.createdAt),
          updatedAt: convertDate(user.updatedAt)
        })
      } catch (error: any) {
        await users.deleteUser(clerk_id)

        if ('email' in error.keyValue)
          res.status(409).end('Failed to create user as email already exists')

        console.log({ error })
        res.status(400).end('Failed to create user')
      }
      break
    case 'PATCH':
      break
    case 'DELETE':
      try {
        await User.deleteOne({ clerkID: query.clerkID })
        await users.deleteUser(query.clerkID as string)
        res.status(200).end('Deleted user')
      } catch (error) {
        console.log(error)

        res.status(424).end('Failed to delete user')
      }
      break
    case 'GET':
      if (Object.keys(query).length !== 0) {
        try {
          const user: UserType = await (query._id
            ? User.findById(query._id)
            : User.findOne({
                ...query
              })
          ).lean()

          res.status(200).json(modifyUser(user))
        } catch (error) {
          res.status(404).end('User Not Found')
        }
      }

      try {
        const getUsers: UserType[] = await User.find().sort('-createdAt').lean()
        const users = getUsers.map(user => modifyUser(user))

        res.status(200).json(users)
      } catch (error) {
        res.status(403).end('You are not allowed to access user data')
      }
      break
  }
}

export default userRoute
