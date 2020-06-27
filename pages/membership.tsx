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
        <meta
          property='og:image'
          content='https://og-social-cards.dankestkush.vercel.app/**.%2Fmembership**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fwebsite.codersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
        />
        <meta property='og:site_name' content='Coders for Causes' />
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
