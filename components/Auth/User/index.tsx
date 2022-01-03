import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { UserProps, UserProvider } from '@helpers/user'

/**
 * The initial value being set to `undefined` or `null` here is important.
 * `undefined` is set to initialize the user object, whereas
 * `null` is used to make the distinction that the network request failed.
 * This important difference is used to redirect users if they are
 * authenticated, have a failed request, or the check hasn't happened yet.
 */
const User: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<UserProps | undefined | null>(undefined)

  try {
    useEffect(() => {
      const auth = async () => {
        try {
          // need to change signin to clerk.dev
          // // query cognito
          // const session = await Auth.currentSession()
          // const id = session.getIdToken()
          // // query backend
          // const response = await fetch(
          //   `${process.env.NEXT_PUBLIC_API_URL}users?awsSub=${
          //     id.decodePayload().sub
          //   }`
          // )
          // const {
          //   data: [user]
          // } = await response.json()
          // setUser({
          //   ...user,
          //   jwt_token: id.getJwtToken()
          // })
        } catch (error) {
          setUser(null)
        }
      }
      if (!user) auth()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userValue = useMemo(() => ({ user, setUser }), [user])

    return (
      <ClerkProvider>
        <UserProvider value={userValue}>{children}</UserProvider>
      </ClerkProvider>
    )
  } catch (error) {
    return <>{children}</>
  }
}

export default User
