import React, { useState } from 'react'
import { useRouter } from 'next/router'
import SignInPage from 'components/Auth/SignInPage'
import SignUpPage from 'components/Auth/SignUpPage'

const AuthWrapper = () => {
  const [isSignUp, setIsSignUp] = useState(false)

  const router = useRouter()
  const query = router?.query?.name
  const nextRoute = typeof query === 'string' ? query : query?.[0]

  return isSignUp ? (
    <SignUpPage route={nextRoute} signIn={setIsSignUp} />
  ) : (
    <SignInPage route={nextRoute} signUp={setIsSignUp} />
  )
}

export default AuthWrapper
