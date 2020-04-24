import React, { useState } from 'react'
import PageContainer from 'components/PageContainer'
import SignInPage from 'components/Auth/SignInPage'
import SignUpPage from 'components/Auth/SignUpPage'

const Membership = (props: { noRedirect?: boolean }) => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <PageContainer>
      {isSignUp ? (
        <SignUpPage noRedirect={props?.noRedirect} signIn={setIsSignUp} />
      ) : (
        <SignInPage noRedirect={props?.noRedirect} signUp={setIsSignUp} />
      )}
    </PageContainer>
  )
}

export default Membership
