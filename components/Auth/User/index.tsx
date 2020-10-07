import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { Auth } from '@aws-amplify/auth'
import { UserProvider } from 'helpers/user'

/**
 * The initial value being set to `undefined` or `null` here is important.
 * `undefined` is set to initialize the user object, whereas
 * `null` is used to make the distinction that the network request failed.
 * This important difference is used to redirect users if they are
 * authenticated, have a failed request, or the check hasn't happened yet.
 */
const User: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState(undefined)

  try {
    useEffect(() => {
      const auth = async () => {
        try {
          // query cognito
          const session = await Auth.currentSession()
          const id = session.getIdToken()

          // query backend
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}users?awsSub=${
              id.decodePayload().sub
            }`
          )
          const {
            data: [user]
          } = await response.json()

          setUser({
            ...user,
            jwt_token: id.getJwtToken()
          })
        } catch (error) {
          setUser(null)
        }
      }
      if (!user) auth()
    }, [])

    const userValue = useMemo(() => ({ user, setUser }), [user])

    return <UserProvider value={userValue}>{children}</UserProvider>
  } catch (error) {
    return <>{children}</>
  }
}

export default User
