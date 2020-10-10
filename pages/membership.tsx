import React, { useState, useContext, useEffect } from 'react'
import Meta from 'components/Utils/Meta'
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

  return (
    <>
      <Meta
        title='Become a Member'
        page='membership'
        description='Sign in using your student credentials or register a new account.'
        image='https://og-social-cards.vercel.app/**.%2Fmembership**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />

      {!user ? (
        isSignUp ? (
          <SignUpPage route={nextRoute} signIn={setIsSignUp} />
        ) : (
          <SignInPage route={nextRoute} signUp={setIsSignUp} />
        )
      ) : null}
    </>
  )
}

export default Membership
