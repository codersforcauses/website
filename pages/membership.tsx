import React, { useState, useContext, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
    <>
      <Head>
        <title>Membership | Coders for Causes</title>
        <meta
          name='description'
          content='Create an account or sign in to Coders for Causes.'
        />
      </Head>
      {isSignUp ? (
        <SignUpPage route={nextRoute} signIn={setIsSignUp} />
      ) : (
        <SignInPage route={nextRoute} signUp={setIsSignUp} />
      )}
    </>
  ) : null
}

export default Membership
