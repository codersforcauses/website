import { FunctionComponent, useMemo, useState } from 'react'
import { UserProvider } from '@helpers/user'
import { User } from '@helpers/global'

const User: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User>(null)
  const userValue = useMemo(() => ({ user, setUser }), [user])

  return <UserProvider value={userValue}>{children}</UserProvider>
}

export default User
