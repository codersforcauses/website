import { useEffect, useState } from 'react'
import Router from 'next/router'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import Meta from '@components/Utils/Meta'
import Title from '@components/Utils/Title'
import SignInPage from '@components/Auth/SignInPage'
import SignUpPage from '@components/Auth/SignUpPage'
import MembershipLoading from '@components/Auth/MembershipLoading'

const Membership = ({ id }: MembershipProps) => {
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    !!id && Router.replace('/dashboard')
  }, [id])

  return (
    <>
      <Meta
        name='Become a Member'
        title='Membership'
        page='membership'
        description='Sign in using your student credentials or register a new account.'
        image='https://og-social-cards.vercel.app/**.%2Fmembership**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />

      <Title typed>{isSignUp ? './sign-up' : './sign-in'}</Title>
      <ClerkLoading>
        <MembershipLoading />
      </ClerkLoading>
      <ClerkLoaded>
        {isSignUp ? (
          <SignUpPage signIn={setIsSignUp} />
        ) : (
          <SignInPage signUp={setIsSignUp} />
        )}
      </ClerkLoaded>
    </>
  )
}

export const getServerSideProps = withServerSideAuth(({ req: { auth } }) => {
  const { sessionId } = auth

  return {
    props: {
      id: sessionId
    }
  }
})

interface MembershipProps {
  id: string
}

export default Membership
