import React, { useState } from 'react'
import PageContainer from '../components/PageContainer'
import SignInPage from '../components/Auth/SignInPage'
import SignUpPage from '../components/Auth/SignUpPage'

const Membership = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  return (
    <PageContainer>
      {isSignUp ? (
        <SignUpPage signIn={setIsSignUp} />
      ) : (
        <SignInPage signUp={setIsSignUp} />
      )}
    </PageContainer>
  )
}

export default Membership
