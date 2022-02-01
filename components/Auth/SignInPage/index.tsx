import {
  useState,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react'
import { useRouter } from 'next/router'
import { useClerk, useMagicLink, useSignIn } from '@clerk/nextjs'
import { EmailLinkFactor } from '@clerk/types'
import { UserContext } from '@helpers/user'
import Title from '@components/Utils/Title'
import { Form, TextField } from '@elements/FormElements'
import { Button } from '@elements/Button'
import Alert from '@elements/Alert'
import validationSchema from './validation'

const defaultValues: FormValues = {
  email: ''
}

const SignInPage = ({ signUp }: SignInProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expired, setExpired] = useState(false)
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  const { setUser } = useContext(UserContext)
  const { setSession } = useClerk()
  const signIn = useSignIn()
  const { startMagicLinkFlow, cancelMagicLinkFlow } = useMagicLink(signIn)

  const goToSignUpPage = useCallback(
    e => {
      e.preventDefault()
      signUp(true)
    },
    [signUp]
  )

  const handleSubmit = useCallback(
    async ({ email }: FormValues) => {
      setLoading(true)
      setVerified(false)
      setExpired(false)

      const url = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'

      try {
        const { supportedFirstFactors } = await signIn.create({
          identifier: email
        })
        const { email_address_id } = supportedFirstFactors.find(
          ff => ff.strategy === 'email_link' && ff.safe_identifier === email
        ) as EmailLinkFactor

        const si = await startMagicLinkFlow({
          emailAddressId: email_address_id,
          redirectUrl: `${url}/verification`
        })

        const verification = si.firstFactorVerification
        if (verification.verifiedFromTheSameClient()) setVerified(true)
        else if (verification.status === 'expired') setExpired(true)

        if (si.status === 'complete') {
          const user = await (await fetch(`/api/users?email=${email}`)).json()
          setUser(user)

          setSession(si.createdSessionId, () => router.push('/dashboard'))
        }

        if (expired) setError('Session has expired. Please sign in to continue')
        if (verified) return <div>Signed in on another tab</div>
      } catch (error: any) {
        console.log({ error })

        error?.errors
          ? setError(error.errors?.[0].message)
          : setError(
              'An unexpected error occurred. Please refresh the page and try again.'
            )
        cancelMagicLinkFlow()
      } finally {
        setLoading(false)
      }
    },
    [
      cancelMagicLinkFlow,
      expired,
      router,
      setSession,
      setUser,
      signIn,
      startMagicLinkFlow,
      verified
    ]
  )

  return (
    <>
      <Title typed>./sign-in</Title>
      <div className='py-12 bg-secondary text-primary md:py-24 dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto'>
          <p>
            Don&apos;t have an account?&nbsp;
            <button className='hover:underline' onClick={goToSignUpPage}>
              Create one
            </button>
            .
          </p>
          <div className='md:max-w-lg md:w-1/2 membership'>
            {error ? (
              <Alert icon color='danger' className='mt-4'>
                {error}
              </Alert>
            ) : (
              loading && (
                <Alert color='info' className='mt-4'>
                  We&apos;ve just sent you an email with a link to continue
                </Alert>
              )
            )}
            <Form<FormValues>
              showNote
              disabled={loading}
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
            >
              <TextField
                setFocused
                label='Email'
                name='email'
                type='email'
                placeholder='hello@codersforcauses.org'
                autoComplete='email'
                description='We will send you an email with a magic link'
                rules={validationSchema.email}
              />
              <Button
                fill
                type='submit'
                loading={loading}
                className='px-8 max-w-max'
              >
                Sign-in
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

interface FormValues {
  email: string
}

interface SignInProps {
  signUp: Dispatch<SetStateAction<boolean>>
}

export default SignInPage
