import { NextApiRequest, NextApiResponse } from 'next'
import { Auth } from 'aws-amplify'
import dbConnect from '@helpers/dbConnect'
import User from '@models/user'

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect()

  const {
    query: { isUWAStudent, user, password }
  } = req

  const data = {
    username: user as string,
    password: password as string
  }
  try {
    if (isUWAStudent) {
      const response = await fetch(`${process.env.PHEME_URL}api/login`, {
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

      // reassign data to use values fetched from pheme login
      data.username = `${user}@student.uwa.edu.au`
      data.password = `${user}${process.env.PHEME_SALT}`
    }

    const cognitoResponse = await Auth.signIn(data.username, data.password)

    const currentUser = await User.findOne({
      awsSub: cognitoResponse.attributes.sub
    }).lean()

    console.log(currentUser)
  } catch ({ code, message }) {
    if (code === 'UserNotConfirmedException') {
      res
        .status(428)
        .end(
          'To login into Coders for Causes, please click on the verification link sent to your email and try again.'
        )
    }
    res
      .status(400)
      .end(
        message ||
          'An unexpected error occurred. Please refresh the page and try again.'
      )
  }
}

export default authHandler
