import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

export default function Page() {
  return (
    <>
      <div className="main container  grid place-items-center text-xl">Signing you in...</div>
      <AuthenticateWithRedirectCallback signUpFallbackRedirectUrl="/create-account/complete-profile" />
    </>
  )
}
