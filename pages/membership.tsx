import { useState } from 'react'
import { withServerSideAuth } from '@clerk/nextjs/ssr'
import { ClerkLoaded } from '@clerk/nextjs'
import Meta from '@components/Utils/Meta'
import SignInPage from '@components/Auth/SignInPage'
import SignUpPage from '@components/Auth/SignUpPage'

const Membership = (props: MembershipProps) => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <>
      <Meta
        name='Become a Member'
        title='Membership'
        page='membership'
        description='Sign in using your student credentials or register a new account.'
        image='https://og-social-cards.vercel.app/**.%2Fmembership**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      <ClerkLoaded>
        {isSignUp ? (
          <SignUpPage route={props.nextRoute} signIn={setIsSignUp} />
        ) : (
          <SignInPage route={props.nextRoute} signUp={setIsSignUp} />
        )}
      </ClerkLoaded>
    </>
  )
}

export const getServerSideProps = withServerSideAuth(
  async ({ query, auth }) => {
    const { userId } = auth
    const nextRoute = query?.name || '/dashboard'

    if (userId)
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }

    return {
      props: {
        nextRoute
      }
    }
  }
)

interface MembershipProps {
  nextRoute: string
}

export default Membership
