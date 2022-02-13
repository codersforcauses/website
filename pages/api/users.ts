import { NextApiRequest, NextApiResponse } from 'next'
import { users } from '@clerk/nextjs/api'
import dayjs from 'dayjs'
import User from '@models/user'
import dbConnect from '@lib/dbConnect'
import { User as UserType } from '@helpers/global'

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
    case 'PATCH':
      try {
        await User.findByIdAndUpdate(query.id, body)
        res.status(200).end('Updated user')
      } catch (error) {
        console.log(error)

        res.status(200).json({
          success: false,
          message: 'Failed to update user'
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
      if (Object.keys(query).length !== 0) {
        try {
          const user: UserType = await (query.id
            ? User.findById(query.id)
            : User.findOne({
                ...query
              })
          ).lean()
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
        const getUsers: UserType[] = await User.find(
          {},
          '-dob -bio -socials -tech -cards'
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
  }
}

export default userRoute
