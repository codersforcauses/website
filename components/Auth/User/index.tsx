import React, { useEffect, useMemo, useState } from 'react'
import { Auth } from 'aws-amplify'
import { UserProvider } from '../../../helpers/user'

// @ts-ignore
const User = props =>
  useMemo(() => {
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState(null)

    // console.log(typeof props)

    try {
      setLoad(true)
      useEffect(() => {
        const auth = async () => {
          const session = await Auth.currentSession()
          return !session ? null : session.getIdToken().decodePayload()
        }
        auth().then(aws => (aws ? setUser(aws.sub) : setUser(null)))
      }, [])

      // query user data here
      // TODO

      return (
        <UserProvider value={{ user: user, setUser: setUser, loading: load }}>
          {props.children}
        </UserProvider>
      )
    } catch (error) {
      return <>{props.children}</>
    } finally {
      setLoad(false)
    }
  }, [])

export default User
