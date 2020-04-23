import React, { FunctionComponent, useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { UserProvider } from 'helpers/user'

const User: FunctionComponent = ({ children }) => {
  const [load, setLoad] = useState(false)
  const [user, setUser] = useState(null)

  try {
    useEffect(() => {
      const auth = async () => {
        try {
          setLoad(true)
          const session = await Auth.currentSession()
          setUser(session.getIdToken().decodePayload())
        } catch (error) {
          setUser(null)
        } finally {
          setLoad(false)
        }
      }
      auth()
    }, [])
    console.log(user)

    // query user data here when backend is built
    // TODO

    return (
      <UserProvider value={{ user: user, setUser: setUser, loading: load }}>
        {children}
      </UserProvider>
    )
  } catch (error) {
    return <>{children}</>
  }
}

export default User
