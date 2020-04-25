import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import PageContainer from 'components/PageContainer'
import SignInPage from 'components/Auth/SignInPage'
import SignUpPage from 'components/Auth/SignUpPage'
import { UserContext } from 'helpers/user'

const Membership = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  const { user } = useContext(UserContext)

  const router = useRouter()
  const query = router?.query?.name
  const nextRoute = typeof query === 'string' ? query : query?.[0]

  useEffect(() => {
    if (user) router.replace(nextRoute ?? '/dashboard')
  }, [user])

  return !user ? (
    <PageContainer>
      {isSignUp ? (
        <SignUpPage route={nextRoute} signIn={setIsSignUp} />
      ) : (
        <SignInPage route={nextRoute} signUp={setIsSignUp} />
      )}
    </PageContainer>
  ) : null
}

export default Membership
