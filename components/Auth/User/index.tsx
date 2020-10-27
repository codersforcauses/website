import * as React from 'react'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
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
          const session = await Auth.currentSession()
          setUser(session.getIdToken().decodePayload())
        } catch (error) {
          setUser(null)
        }
      }
      if (!user) auth()
    }, [])
    // console.log(user)

    // query user data here when backend is built
    // TODO

    const userValue = useMemo(() => ({ user, setUser }), [user])

    return <UserProvider value={userValue}>{children}</UserProvider>
  } catch (error) {
    return <>{children}</>
  }
}

export default User
