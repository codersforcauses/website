import React, { FunctionComponent, useEffect, useState } from 'react'
import { Auth } from '@aws-amplify/auth'
import { UserProvider } from 'helpers/user'

const User: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState(null)

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
      auth()
    }, [])
    // console.log(user)

    // query user data here when backend is built
    // TODO

    return (
      <UserProvider
        value={{
          user: user,
          setUser: setUser
        }}
      >
        {children}
      </UserProvider>
    )
  } catch (error) {
    return <>{children}</>
  }
}

export default User
