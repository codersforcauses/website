import { ClerkLoaded } from '@clerk/nextjs'
import Meta from '@components/Utils/Meta'
import VerifiedPage from '@components/Auth/Verification'

const Verification = () => {
  return (
    <>
      <Meta
        name='Verify Membership'
        title='Verification'
        page='verification'
        description='Sign in using your student credentials or register a new account.'
        image='https://og-social-cards.vercel.app/**.%2Fverification**.png?theme=dark&md=1&fontSize=125px&images=https%3A%2Fcodersforcauses.org%2Flogo%2Fcfc_logo_white_full.svg'
      />
      <ClerkLoaded>
        <VerifiedPage />
      </ClerkLoaded>
    </>
  )
}

export default Verification
